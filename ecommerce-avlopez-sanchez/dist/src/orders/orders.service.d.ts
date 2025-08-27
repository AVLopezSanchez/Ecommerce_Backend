import { Orders } from './entities/order.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';
import { OrderDetails } from 'src/order-details/entities/orderDetails.entity';
import { dataOrderDto } from './dto/create-order.dto';
import { Status } from './status.enum';
export declare class OrdersService {
    private ordersRepository;
    private usersRepository;
    private productsRepository;
    private orderDetailsRepository;
    constructor(ordersRepository: Repository<Orders>, usersRepository: Repository<User>, productsRepository: Repository<Product>, orderDetailsRepository: Repository<OrderDetails>);
    addOrder(dataOrder: dataOrderDto): Promise<Orders[]>;
    getOrderById(id: string): Promise<Orders>;
    updateStatusOrder(orderId: string, status: Status): Promise<Orders>;
}
