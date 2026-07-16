import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import type { Note } from "./types/note";
import {
	getActiveNotes,
	getArchivedNotes,
	createNote,
	updateNote,
	deleteNote,
	toggleArchive,
	getNotesByCategory,
} from "./api/notes";
import { useAuth } from "./context/AuthContext";
import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";
import CategoryFilter from "./components/CategoryFilter";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const BACKEND_URL =
	import.meta.env.VITE_API_URL ??
	(import.meta.env.PROD ? "/api" : "http://localhost:3000");

// Keep Render free tier alive
const keepAlive = () => {
	fetch(`${BACKEND_URL}/health`).catch(() => {});
};

type Tab = "active" | "archived";

function NotesApp() {
	const { user, logout } = useAuth();
	const [notes, setNotes] = useState<Note[]>([]);
	const [tab, setTab] = useState<Tab>("active");
	const [showForm, setShowForm] = useState(false);
	const [editingNote, setEditingNote] = useState<Note | null>(null);
	const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
		null,
	);
	const [categoryRefresh, setCategoryRefresh] = useState(0);

	const fetchNotes = useCallback(async () => {
		setCategoryRefresh((prev) => prev + 1); // refresh CategoryFilter
		if (selectedCategoryId !== null && tab === "active") {
			const data = await getNotesByCategory(selectedCategoryId);
			setNotes(data);
		} else {
			const data =
				tab === "active" ? await getActiveNotes() : await getArchivedNotes();
			setNotes(data);
		}
	}, [tab, selectedCategoryId]);

	useEffect(() => {
		fetchNotes();
	}, [fetchNotes]);

	useEffect(() => {
		keepAlive();
		const interval = setInterval(keepAlive, 14 * 60 * 1000); // every 14 minutes
		return () => clearInterval(interval);
	}, []);

	const handleSubmit = async (data: { title: string; content: string }) => {
		if (editingNote) {
			await updateNote(editingNote.id, data);
		} else {
			await createNote(data);
		}
		setShowForm(false);
		setEditingNote(null);
		fetchNotes();
	};

	const handleEdit = (note: Note) => {
		setEditingNote(note);
		setShowForm(true);
	};

	const handleDelete = async (id: number) => {
		await deleteNote(id);
		fetchNotes();
	};

	const handleToggleArchive = async (id: number) => {
		await toggleArchive(id);
		fetchNotes();
	};

	const handleCancel = () => {
		setShowForm(false);
		setEditingNote(null);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-5xl mx-auto px-4 py-8">
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-bold text-gray-800">Notes App</h1>
					<div className="flex items-center gap-3">
						<span className="text-sm text-gray-500">{user?.email}</span>
						<button
							onClick={logout}
							className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg px-3 py-1"
						>
							Logout
						</button>

						{!showForm && tab === "active" && (
							<button
								onClick={() => setShowForm(true)}
								className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium"
							>
								+ Create Note
							</button>
						)}
					</div>
				</div>

				{/* Form */}
				{showForm && (
					<div className="mb-6">
						<NoteForm
							onSubmit={handleSubmit}
							onCancel={handleCancel}
							editingNote={editingNote}
						/>
					</div>
				)}

				{/* Tabs */}
				<div className="flex gap-2 mb-4">
					<button
						onClick={() => {
							setTab("active");
							setShowForm(false);
							setSelectedCategoryId(null);
						}}
						className={`px-4 py-2 rounded-lg text-sm font-medium ${
							tab === "active"
								? "bg-blue-500 text-white"
								: "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
						}`}
					>
						Active
					</button>
					<button
						onClick={() => {
							setTab("archived");
							setShowForm(false);
							setSelectedCategoryId(null);
						}}
						className={`px-4 py-2 rounded-lg text-sm font-medium ${
							tab === "archived"
								? "bg-blue-500 text-white"
								: "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
						}`}
					>
						Archived
					</button>
				</div>

				{/* Category filter — only on active tab */}
				{tab === "active" && (
					<CategoryFilter
						selectedCategoryId={selectedCategoryId}
						onSelectCategory={setSelectedCategoryId}
						refreshTrigger={categoryRefresh}
					/>
				)}

				{/* Notes list */}
				<NoteList
					notes={notes}
					onEdit={handleEdit}
					onDelete={handleDelete}
					onToggleArchive={handleToggleArchive}
					onUpdate={fetchNotes}
				/>
			</div>
		</div>
	);
}

export default function App() {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route
				path="/"
				element={
					<PrivateRoute>
						<NotesApp />
					</PrivateRoute>
				}
			/>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}
