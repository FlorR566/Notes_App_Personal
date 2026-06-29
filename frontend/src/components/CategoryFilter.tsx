import { useState, useEffect } from "react";
import type { Category } from "../types/note";
import { getCategories } from "../api/notes";

interface Props {
	selectedCategoryId: number | null;
	onSelectCategory: (id: number | null) => void;
	refreshTrigger: number;
}

export default function CategoryFilter({
	selectedCategoryId,
	onSelectCategory,
	refreshTrigger,
}: Props) {
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		getCategories().then(setCategories);
	}, [refreshTrigger]);

	if (categories.length === 0) return null;

	return (
		<div className="flex flex-wrap gap-2 mb-4">
			<button
				onClick={() => onSelectCategory(null)}
				className={`px-3 py-1 rounded-full text-xs font-medium ${
					selectedCategoryId === null
						? "bg-blue-500 text-white"
						: "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
				}`}
			>
				All
			</button>
			{categories.map((cat) => (
				<button
					key={cat.id}
					onClick={() => onSelectCategory(cat.id)}
					className={`px-3 py-1 rounded-full text-xs font-medium ${
						selectedCategoryId === cat.id
							? "bg-blue-500 text-white"
							: "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
					}`}
				>
					{cat.name}
				</button>
			))}
		</div>
	);
}
