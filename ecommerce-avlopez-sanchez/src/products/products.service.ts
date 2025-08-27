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
import { DataProductDto } from 'src/Dtos/dataProductDto';

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

  async addProductForm(data: DataProductDto) {
    const productFound: Product | null = await this.productsRepository.findOne({
      where: { name: data.name },
    });

    if (productFound)
      throw new BadRequestException(`Producto ${data.name} ya existe`);

    const categoryFound: Categories | null =
      await this.categoriesRepository.findOne({
        where: { name: data.category },
      });

    if (!categoryFound)
      throw new NotFoundException(`No existe la categoria ${data.category}`);
    if (!productFound) {
      const newProduct: Product = this.productsRepository.create({
        name: data.name,
        price: data.price,
        stock: data.stock,
        description: data.description,
        category_id: categoryFound,
      });
      await this.productsRepository.save(newProduct);
      return newProduct;
    }
  }

  async addOneProductStock(productId: string) {
    //buscar el product, aumentar en 1 el stock, guardar cambios en bd;
    const product: Product | null = await this.productsRepository.findOne({
      where: { id: productId },
    });
    if (!product)
      throw new NotFoundException(`El product con id ${product} no existe`);

    product.stock += 1;
    await this.productsRepository.save(product);

    return product;
  }
}
