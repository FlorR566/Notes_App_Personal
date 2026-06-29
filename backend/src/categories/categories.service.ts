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

    note.categories = [...(note.categories || []), category];
    return this.notesRepository.save(note);
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
      .innerJoin('note.categories', 'category')
      .where('category.id = :categoryId', { categoryId })
      .andWhere('note.archived = false')
      .getMany();
  }
}
