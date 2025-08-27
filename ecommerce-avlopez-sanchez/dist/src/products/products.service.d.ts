import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Categories } from 'src/categories/entities/category.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { DataProductDto } from 'src/Dtos/dataProductDto';
export declare class ProductsService implements OnModuleInit {
    private readonly productsRepository;
    private readonly categoriesRepository;
    private readonly categoriesService;
    constructor(productsRepository: Repository<Product>, categoriesRepository: Repository<Categories>, categoriesService: CategoriesService);
    onModuleInit(): Promise<void>;
    addProduct(): Promise<Product[]>;
    getProducts(page: number, limit: number): Promise<Product[]>;
    addProductForm(data: DataProductDto): Promise<Product | undefined>;
    addOneProductStock(productId: string): Promise<Product>;
}
