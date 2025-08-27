import { Product } from 'src/products/product.entity';
import { Status } from '../status.enum';
export declare class dataOrderDto {
    userId: string;
    status: Status;
    products: Partial<Product>[];
}
