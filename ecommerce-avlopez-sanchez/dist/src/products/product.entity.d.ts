import { Categories } from 'src/categories/entities/category.entity';
import { OrderDetails } from 'src/order-details/entities/orderDetails.entity';
export declare class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    quantity: number;
    imgUrl: string;
    category_id: Categories;
    orderDetails: OrderDetails[];
}
