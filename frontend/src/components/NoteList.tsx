import type { Note } from "../types/note";
import NoteCard from "./NoteCard";

interface Props {
	notes: Note[];
	onEdit: (note: Note) => void;
	onDelete: (id: number) => void;
	onToggleArchive: (id: number) => void;
	onUpdate: () => void;
}

export default function NoteList({
	notes,
	onEdit,
	onDelete,
	onToggleArchive,
	onUpdate,
}: Props) {
	if (notes.length === 0) {
		return (
			<p className="text-gray-400 text-sm text-center py-8">
				No notes here yet.
			</p>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{notes.map((note) => (
				<NoteCard
					key={note.id}
					note={note}
					onEdit={onEdit}
					onDelete={onDelete}
					onToggleArchive={onToggleArchive}
					onUpdate={onUpdate}
				/>
			))}
		</div>
	);
}
