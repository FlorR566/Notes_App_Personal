import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  findAllActive(): Promise<Note[]> {
    return this.notesRepository.find({ where: { archived: false } });
  }

  findAllArchived(): Promise<Note[]> {
    return this.notesRepository.find({ where: { archived: true } });
  }

  async findOne(id: number): Promise<Note> {
    const note = await this.notesRepository.findOne({ where: { id } });
    if (!note) throw new NotFoundException(`Note #${id} not found`);
    return note;
  }

  create(data: Partial<Note>): Promise<Note> {
    const note = this.notesRepository.create(data);
    return this.notesRepository.save(note);
  }

  async update(id: number, data: Partial<Note>): Promise<Note> {
    await this.findOne(id);
    await this.notesRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.notesRepository.delete(id);
  }

  async toggleArchive(id: number): Promise<Note> {
    const note = await this.findOne(id);
    note.archived = !note.archived;
    return this.notesRepository.save(note);
  }
}
