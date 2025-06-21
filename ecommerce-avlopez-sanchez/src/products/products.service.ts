import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Categories } from 'src/categories/entities/category.entity';
import { dataIncial } from 'src/dataInicial';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async onModuleInit() {
    try {
      await this.categoriesService.ensureCategoriesLoaded();

      const productsFound = await this.productsRepository.find();
      if (productsFound.length === 0) {
        await this.addProduct();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(): Promise<Product[]> {
    const productsFound: Product[] = await this.productsRepository.find();
    if (productsFound.length > 0)
      throw new BadRequestException('Productos cargados previamente');

    const arrayData = dataIncial;
    const products: Promise<Product>[] = arrayData.map(async (element) => {
      const category: Categories | null =
        await this.categoriesRepository.findOne({
          where: { name: element.category },
        });
      if (!category) throw new NotFoundException('no se encontro la categoria');

      const product = this.productsRepository.create({
        name: element.name,
        description: element.description,
        price: element.price,
        stock: element.stock,
        category_id: category,
      });
      await this.productsRepository.save(product);
      return product;
    });
    return Promise.all(products);
  }

  async getProducts(page: number, limit: number): Promise<Product[]> {
    let products: Product[] = await this.productsRepository.find({
      relations: {
        category_id: true,
      },
    });
    const start = (page - 1) * limit;
    const finish = start + limit;

    products = products.slice(start, finish);
    return products;
  }
}
