import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './note.entity';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesSevice: NotesService) {}

  @Get()
  findAllActive(): Promise<Note[]> {
    return this.notesSevice.findAllActive();
  }

  @Get('archived')
  findAllArchived(): Promise<Note[]> {
    return this.notesSevice.findAllArchived();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Note> {
    return this.notesSevice.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<Note>): Promise<Note> {
    return this.notesSevice.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<Note>,
  ): Promise<Note> {
    return this.notesSevice.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.notesSevice.remove(id);
  }

  @Patch(':id/archive')
  toggleArchive(@Param('id', ParseIntPipe) id: number): Promise<Note> {
    return this.notesSevice.toggleArchive(id);
  }
}
