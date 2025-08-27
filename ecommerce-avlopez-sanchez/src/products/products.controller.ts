import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { Roles } from 'src/decorates/role.decorator';
import { Role } from 'src/roles.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DataProductDto } from 'src/Dtos/dataProductDto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit) {
      return this.productsService.getProducts(+page, +limit);
    }
    return this.productsService.getProducts(1, 5);
  }

  @Get('seeder')
  addProduct() {
    return this.productsService.addProduct();
  }

  @ApiBearerAuth()
  @Post('form')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  addProducForm(@Body() data: DataProductDto) {
    return this.productsService.addProductForm(data);
  }

  @ApiBearerAuth()
  @Put(':productId')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  addOneProductStock(@Param('productId', ParseUUIDPipe) productId: string) {
    return this.productsService.addOneProductStock(productId);
  }
}
