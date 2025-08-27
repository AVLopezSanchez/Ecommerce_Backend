import { Orders } from 'src/orders/entities/order.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: number;
    country: string;
    address: string;
    city: string;
    perfilImg: string;
    isAdmin: boolean;
    orders_id: Orders[];
}
