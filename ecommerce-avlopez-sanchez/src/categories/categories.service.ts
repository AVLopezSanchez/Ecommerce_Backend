import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/category.entity';
import { Repository } from 'typeorm';
import { dataIncial } from 'src/dataInicial';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async addCategories(): Promise<string> {
    const arrayDatos = dataIncial;
    const uniqueCategories = [
      ...new Set(arrayDatos.map((product) => product.category)),
    ];
    const categories: Categories[] = uniqueCategories.map((categoryName) =>
      this.categoriesRepository.create({ name: categoryName }),
    );
    await this.categoriesRepository.upsert(categories, ['name']);
    return 'Se han cargado todas las categorias';
  }

  async getCategories() {
    const categories: Categories[] = await this.categoriesRepository.find();
    return categories;
  }
}
