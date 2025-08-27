import { OrdersService } from './orders.service';
import { dataOrderDto } from './dto/create-order.dto';
import { Status } from './status.enum';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(dataOrder: dataOrderDto): Promise<import("./entities/order.entity").Orders[]>;
    getOrderById(id: string): Promise<import("./entities/order.entity").Orders>;
    updateStatusOrder(orderId: string, status: Status): Promise<import("./entities/order.entity").Orders>;
}
