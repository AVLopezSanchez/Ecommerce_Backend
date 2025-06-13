import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Categories } from 'src/categories/entities/category.entity';
import { dataIncial } from 'src/dataInicial';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async addProduct(): Promise<Product[]> {
    const arrayData = dataIncial;
    const products: Promise<Product>[] = arrayData.map(async (element) => {
      const category: Categories | null =
        await this.categoriesRepository.findOne({
          where: { name: element.category },
        });
      if (!category) throw new NotFoundException('no se encontor la categoria');

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
    let products: Product[] = await this.productsRepository.find();
    // [A,B] [C,D] [E,F]
    const start = (page - 1) * limit;
    const finish = start + limit;

    products = products.slice(start, finish);
    return products;
  }
}
