import { useState, useEffect } from "react";
import type { Note } from "../types/note";

interface Props {
	onSubmit: (data: { title: string; content: string }) => void;
	onCancel: () => void;
	editingNote?: Note | null;
}

export default function NoteForm({ onSubmit, onCancel, editingNote }: Props) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => {
		if (editingNote) {
			setTitle(editingNote.title);
			setContent(editingNote.content);
		} else {
			setTitle("");
			setContent("");
		}
	}, [editingNote]);

	const handleSubmit = () => {
		if (!title.trim() || !content.trim()) return;
		onSubmit({ title, content });
		setTitle("");
		setContent("");
	};

	return (
		<div className="bg-white rounded-xl shadow p-6 border border-gray-100 flex flex-col gap-4">
			<h2 className="text-lg font-semibold text-gray-800">
				{editingNote ? "Edit note" : "New note"}
			</h2>
			<input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
			/>
			<textarea
				placeholder="Content"
				value={content}
				onChange={(e) => setContent(e.target.value)}
				rows={4}
				className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
			/>
			<div className="flex gap-2">
				<button
					onClick={handleSubmit}
					className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 text-sm font-medium"
				>
					{editingNote ? "Save changes" : "Create note"}
				</button>
				<button
					onClick={onCancel}
					className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg py-2 text-sm font-medium"
				>
					Cancel
				</button>
			</div>
		</div>
	);
}
