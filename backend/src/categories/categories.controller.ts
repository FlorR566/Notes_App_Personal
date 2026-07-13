import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Post()
  create(@Body() body: { name: string }) {
    return this.categoriesService.create(body.name);
  }

  @Post(':noteId/notes/:categoryId')
  addCategoryToNote(
    @Param('noteId', ParseIntPipe) noteId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.categoriesService.addCategoryToNote(noteId, categoryId);
  }

  @Delete(':noteId/notes/:categoryId')
  removeCategoryFromNote(
    @Param('noteId', ParseIntPipe) noteId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.categoriesService.removeCategoryFromNote(noteId, categoryId);
  }

  @Get('notes/:categoryId')
  getNotesByCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Req() req: Request,
  ) {
    const user = req.user as { id: number; email: string };
    return this.categoriesService.getNotesByCategory(categoryId, user.id);
  }
}
