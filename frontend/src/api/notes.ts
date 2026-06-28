import axios from "axios";
import type { Note } from "../types/note";

const api = axios.create({
	baseURL: "http://localhost:3000",
});

export const getActiveNotes = (): Promise<Note[]> =>
	api.get("/notes").then((res) => res.data);

export const getArchivedNotes = (): Promise<Note[]> =>
	api.get("/Notes/archived").then((res) => res.data);

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
