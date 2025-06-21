import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/categories/entities/category.entity';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Categories])],
  controllers: [ProductsController],
  providers: [ProductsService, CategoriesService],
})
export class ProductsModule {}
