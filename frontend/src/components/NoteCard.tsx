import type { Note } from "../types/note";

interface Props {
	note: Note;
	onEdit: (note: Note) => void;
	onDelete: (id: number) => void;
	onToggleArchive: (id: number) => void;
}

export default function NoteCard({
	note,
	onEdit,
	onDelete,
	onToggleArchive,
}: Props) {
	return (
		<div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 border border-gray-100">
			<h2 className="text-lg font-semibold text-gray-800">{note.title}</h2>
			<p className="text-gray-600 text-sm flex-1">{note.content}</p>
			<div className="flex gap-2 mt-2">
				{!note.archived && (
					<button
						onClick={() => onEdit(note)}
						className="flex-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg py-1 px-2"
					>
						Editar
					</button>
				)}
				<button
					onClick={() => onToggleArchive(note.id)}
					className="flex-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-1 px-2"
				>
					{note.archived ? "Desarchivar" : "Archivar"}
				</button>
				<button
					onClick={() => onDelete(note.id)}
					className="flex-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg py-1 px-2"
				>
					Eliminar
				</button>
			</div>
		</div>
	);
}
