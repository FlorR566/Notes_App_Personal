import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  findAllActive(userId: number): Promise<Note[]> {
    console.log('Finding notes for userId: ', userId);
    return this.notesRepository.find({
      where: { archived: false, user: { id: userId } },
    });
  }

  findAllArchived(userId: number): Promise<Note[]> {
    return this.notesRepository.find({
      where: { archived: true, user: { id: userId } },
    });
  }

  async findOne(id: number): Promise<Note> {
    const note = await this.notesRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!note) throw new NotFoundException(`Note #${id} not found`);
    return note;
  }

  async create(data: Partial<Note>, userId: number): Promise<Note> {
    const note = this.notesRepository.create({
      ...data,
      user: { id: userId },
    });
    return this.notesRepository.save(note);
  }

  async update(id: number, data: Partial<Note>, userId: number): Promise<Note> {
    const note = await this.findOne(id);
    if (note.user.id !== userId) throw new ForbiddenException();
    await this.notesRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number, userId: number): Promise<void> {
    const note = await this.findOne(id);
    if (note.user.id !== userId) throw new ForbiddenException();
    await this.notesRepository.delete(id);
  }

  async toggleArchive(id: number, userId: number): Promise<Note> {
    const note = await this.findOne(id);
    if (note.user.id !== userId) throw new ForbiddenException();
    note.archived = !note.archived;
    return this.notesRepository.save(note);
  }
}
