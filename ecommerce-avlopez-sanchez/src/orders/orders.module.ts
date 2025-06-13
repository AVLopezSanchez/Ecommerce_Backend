import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';
import { OrderDetails } from 'src/order-details/entities/orderDetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, User, Product, OrderDetails])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
