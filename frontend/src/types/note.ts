export interface Category {
	id: number;
	name: string;
}

export interface Note {
	id: number;
	title: string;
	content: string;
	archived: boolean;
	categories: Category[];
	createdAt: string;
	updatedAt: string;
}
