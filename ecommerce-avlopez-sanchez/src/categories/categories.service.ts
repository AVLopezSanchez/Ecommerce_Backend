import { BadRequestException, Injectable } from '@nestjs/common';
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

  async ensureCategoriesLoaded(): Promise<void> {
    const categoriesFound = await this.categoriesRepository.find();
    if (categoriesFound.length === 0) {
      await this.addCategories();
    }
  }

  async onModuleInit() {
    const categoriesFound: Categories[] =
      await this.categoriesRepository.find();
    if (categoriesFound.length === 0) {
      await this.addCategories();
    }
  }

  async addCategories(): Promise<string> {
    const categoriesFound: Categories[] =
      await this.categoriesRepository.find();
    if (categoriesFound.length > 0)
      throw new BadRequestException('Categorias cargadas previamente');

    const arrayDatos = dataIncial;
    const uniqueCategories = [
      ...new Set(arrayDatos.map((element) => element.category)),
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
