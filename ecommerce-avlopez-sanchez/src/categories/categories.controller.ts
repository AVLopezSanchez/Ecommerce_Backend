import { Controller, Post, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('seeder')
  addCategory() {
    return this.categoriesService.addCategories();
  }

  @Get()
  findAll() {
    return this.categoriesService.getCategories();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoriesService.findOne(+id);
  // }
}
