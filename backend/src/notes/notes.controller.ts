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
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { NotesService } from './notes.service';
import { Note } from './note.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAllActive(@Req() req: Request): Promise<Note[]> {
    const user = req.user as { id: number; email: string };
    return this.notesService.findAllActive(user.id);
  }

  @Get('archived')
  findAllArchived(@Req() req: Request): Promise<Note[]> {
    const user = req.user as { id: number; email: string };
    return this.notesService.findAllArchived(user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Note> {
    return this.notesService.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<Note>, @Req() req: Request): Promise<Note> {
    const user = req.user as { id: number; email: string };
    return this.notesService.create(body, user.id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<Note>,
    @Req() req: Request,
  ): Promise<Note> {
    const user = req.user as { id: number; email: string };
    return this.notesService.update(id, body, user.id);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ): Promise<void> {
    const user = req.user as { id: number; email: string };
    return this.notesService.remove(id, user.id);
  }

  @Patch(':id/archive')
  toggleArchive(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ): Promise<Note> {
    const user = req.user as { id: number; email: string };
    return this.notesService.toggleArchive(id, user.id);
  }
}
