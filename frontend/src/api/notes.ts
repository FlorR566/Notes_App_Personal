import axios from "axios";
import type { Note, Category } from "../types/note";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
	withCredentials: true,
});

export const getActiveNotes = (): Promise<Note[]> =>
	api.get("/notes").then((res) => res.data);

export const getArchivedNotes = (): Promise<Note[]> =>
	api.get("/notes/archived").then((res) => res.data);

export const createNote = (data: {
	title: string;
	content: string;
}): Promise<Note> => api.post("/notes", data).then((res) => res.data);

export const updateNote = (
	id: number,
	data: { title: string; content: string },
): Promise<Note> => api.put(`/notes/${id}`, data).then((res) => res.data);

export const deleteNote = (id: number): Promise<void> =>
	api.delete(`/notes/${id}`).then((res) => res.data);

export const toggleArchive = (id: number): Promise<Note> =>
	api.patch(`/notes/${id}/archive`).then((res) => res.data);

// Categories
export const getCategories = (): Promise<Category[]> =>
	api.get("/categories").then((res) => res.data);

export const createCategory = (name: string): Promise<Category> =>
	api.post("/categories", { name }).then((res) => res.data);

export const addCategoryToNote = (
	noteId: number,
	categoryId: number,
): Promise<Note> =>
	api.post(`/categories/${noteId}/notes/${categoryId}`).then((res) => res.data);

export const removeCategoryFromNote = (
	noteId: number,
	categoryId: number,
): Promise<Note> =>
	api
		.delete(`/categories/${noteId}/notes/${categoryId}`)
		.then((res) => res.data);

export const getNotesByCategory = (categoryId: number): Promise<Note[]> =>
	api.get(`/categories/notes/${categoryId}`).then((res) => res.data);
