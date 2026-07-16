import axios from "axios";
import type { Note, Category } from "../types/note";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true, // necessary to send and receive cookies
});

// Separate instance for refresh — avoids loops with the interceptor
const refreshApi = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

// Interceptor that retries with refresh when it receives 401
let isRefreshing = false;
let failedQueue: Array<{
	resolve: (value: unknown) => void;
	reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown) => {
	failedQueue.forEach((prom) => {
		if (error) prom.reject(error);
		else prom.resolve(undefined);
	});
	failedQueue = [];
};

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			!originalRequest.url?.includes("/auth/")
		) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then(() => api(originalRequest))
					.catch((err) => Promise.reject(err));
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				await refreshApi.post("/auth/refresh", {});
				processQueue(null);
				return api(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError);
				window.location.href = "/login";
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	},
);

// Notes
export const getActiveNotes = (): Promise<Note[]> =>
	api.get("/api/notes").then((res) => res.data);

export const getArchivedNotes = (): Promise<Note[]> =>
	api.get("/api/notes/archived").then((res) => res.data);

export const createNote = (data: {
	title: string;
	content: string;
}): Promise<Note> => api.post("/api/notes", data).then((res) => res.data);

export const updateNote = (
	id: number,
	data: { title: string; content: string },
): Promise<Note> => api.put(`/api/notes/${id}`, data).then((res) => res.data);

export const deleteNote = (id: number): Promise<void> =>
	api.delete(`/api/notes/${id}`).then((res) => res.data);

export const toggleArchive = (id: number): Promise<Note> =>
	api.patch(`/api/notes/${id}/archive`).then((res) => res.data);

// Categories
export const getCategories = (): Promise<Category[]> =>
	api.get("/api/categories").then((res) => res.data);

export const createCategory = (name: string): Promise<Category> =>
	api.post("/api/categories", { name }).then((res) => res.data);

export const addCategoryToNote = (
	noteId: number,
	categoryId: number,
): Promise<Note> =>
	api
		.post(`/api/categories/${noteId}/notes/${categoryId}`)
		.then((res) => res.data);

export const removeCategoryFromNote = (
	noteId: number,
	categoryId: number,
): Promise<Note> =>
	api
		.delete(`/api/categories/${noteId}/notes/${categoryId}`)
		.then((res) => res.data);

export const getNotesByCategory = (categoryId: number): Promise<Note[]> =>
	api.get(`/api/categories/notes/${categoryId}`).then((res) => res.data);
