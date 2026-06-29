import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { Note } from '../notes/note.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  async create(name: string): Promise<Category> {
    const category = this.categoriesRepository.create({ name });
    return this.categoriesRepository.save(category);
  }

  async addCategoryToNote(noteId: number, categoryId: number): Promise<Note> {
    const note = await this.notesRepository.findOne({
      where: { id: noteId },
      relations: { categories: true },
    });
    if (!note) throw new NotFoundException(`Note #${noteId} not found`);

    const category = await this.categoriesRepository.findOne({
      where: { id: categoryId },
    });
    if (!category)
      throw new NotFoundException(`Category #${categoryId} not found`);

    // Veriry if category is alrready asigned before to add
    const alrreadyAssigned = note.categories.some((c) => c.id === categoryId);
    if (!alrreadyAssigned) {
      note.categories = [...(note.categories || []), category];
      return this.notesRepository.save(note);
    }

    return note;
  }

  async removeCategoryFromNote(
    noteId: number,
    categoryId: number,
  ): Promise<Note> {
    const note = await this.notesRepository.findOne({
      where: { id: noteId },
      relations: { categories: true },
    });
    if (!note) throw new NotFoundException(`Note #${noteId} not found`);

    note.categories = note.categories.filter((c) => c.id !== categoryId);
    return this.notesRepository.save(note);
  }

  async getNotesByCategory(categoryId: number): Promise<Note[]> {
    return this.notesRepository
      .createQueryBuilder('note')
      .leftJoinAndSelect('note.categories', 'category')
      .innerJoin('note.categories', 'filterCategory')
      .where('filterCategory.id = :categoryId', { categoryId })
      .andWhere('note.archived = false')
      .getMany();
  }
}
