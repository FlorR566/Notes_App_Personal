import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';

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
  getNotesByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoriesService.getNotesByCategory(categoryId);
  }
}
