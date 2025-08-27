import { Orders } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/product.entity';
export declare class OrderDetails {
    id: string;
    price: number;
    order_id: Orders;
    products: Product[];
}
