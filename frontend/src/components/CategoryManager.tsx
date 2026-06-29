import { useState, useEffect } from "react";
import type { Category } from "../types/note";
import {
	getCategories,
	createCategory,
	addCategoryToNote,
	removeCategoryFromNote,
} from "../api/notes";

interface Props {
	noteId: number;
	noteCategories: Category[];
	onUpdate: () => void;
}

export default function CategoryManager({
	noteId,
	noteCategories,
	onUpdate,
}: Props) {
	const [allCategories, setAllCategories] = useState<Category[]>([]);
	const [newCategoryName, setNewCategoryName] = useState("");

	useEffect(() => {
		getCategories().then(setAllCategories);
	}, []);

	const handleAdd = async (categoryId: number) => {
		await addCategoryToNote(noteId, categoryId);
		onUpdate();
	};

	const handleRemove = async (categoryId: number) => {
		await removeCategoryFromNote(noteId, categoryId);
		onUpdate();
	};

	const handleCreate = async () => {
		if (!newCategoryName.trim()) return;
		const created = await createCategory(newCategoryName.trim());
		await addCategoryToNote(noteId, created.id);
		setNewCategoryName("");
		setAllCategories(await getCategories());
		onUpdate();
	};

	const assignedIds = noteCategories.map((c) => c.id);
	const unassigned = allCategories.filter((c) => !assignedIds.includes(c.id));

	return (
		<div className="mt-3 border-t border-gray-100 pt-3 flex flex-col gap-2">
			{/* Assigned categories */}
			<div className="flex flex-wrap gap-1">
				{noteCategories.map((cat) => (
					<span
						key={cat.id}
						className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
					>
						{cat.name}
						<button
							onClick={() => handleRemove(cat.id)}
							className="hover:text-red-500 font-bold"
						>
							×
						</button>
					</span>
				))}
			</div>

			{/* Add existing category */}
			{unassigned.length > 0 && (
				<select
					onChange={(e) => handleAdd(Number(e.target.value))}
					value=""
					className="border border-gray-300 rounded-lg px-2 py-1 text-xs focus:outline-none"
				>
					<option value="" disabled>
						+ Add category
					</option>
					{unassigned.map((cat) => (
						<option key={cat.id} value={cat.id}>
							{cat.name}
						</option>
					))}
				</select>
			)}

			{/* Create new category */}
			<div className="flex gap-1">
				<input
					type="text"
					placeholder="New category..."
					value={newCategoryName}
					onChange={(e) => setNewCategoryName(e.target.value)}
					className="flex-1 border border-gray-300 rounded-lg px-2 py-1 text-xs focus:outline-none"
				/>
				<button
					onClick={handleCreate}
					className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded-lg"
				>
					Create
				</button>
			</div>
		</div>
	);
}
