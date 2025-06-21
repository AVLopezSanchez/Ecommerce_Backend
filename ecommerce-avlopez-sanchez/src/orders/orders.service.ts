import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Orders } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';
import { OrderDetails } from 'src/order-details/entities/orderDetails.entity';
import { dataOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
  ) {}

  async addOrder(dataOrder: dataOrderDto): Promise<Orders[]> {
    const user: User | null = await this.usersRepository.findOne({
      where: { id: dataOrder.userId },
    });
    if (!user) throw new NotFoundException('El usuario no existe');

    const newOrder: Orders = this.ordersRepository.create({
      date: new Date(),
      user: user,
    });
    await this.ordersRepository.save(newOrder);

    let totalPrice = 0;

    const productArr = await Promise.all(
      dataOrder.products.map(async (element) => {
        const product: Product | null = await this.productsRepository.findOne({
          where: { id: element.id },
        });

        if (!product) throw new NotFoundException('Producto no encontrado');

        product.stock -= 1;
        await this.productsRepository.save(product);

        if (!product.stock)
          throw new BadRequestException('Producto no tiene stock');

        totalPrice += Number(product.price);

        return product;
      }),
    );

    const newOrderDetail = this.orderDetailsRepository.create({
      price: Number(totalPrice.toFixed(2)),
      order_id: newOrder,
      products: productArr,
    });

    await this.orderDetailsRepository.save(newOrderDetail);

    return await this.ordersRepository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });
  }

  async getOrderById(id: string): Promise<Orders> {
    const order: Orders | null = await this.ordersRepository.findOneBy({ id });

    if (!order) throw new NotFoundException(`La orden con id: ${id} no existe`);

    return order;
  }
}
