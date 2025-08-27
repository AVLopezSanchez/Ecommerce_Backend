import { ProductsService } from './products.service';
import { DataProductDto } from 'src/Dtos/dataProductDto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(page: string, limit: string): Promise<import("./product.entity").Product[]>;
    addProduct(): Promise<import("./product.entity").Product[]>;
    addProducForm(data: DataProductDto): Promise<import("./product.entity").Product | undefined>;
    addOneProductStock(productId: string): Promise<import("./product.entity").Product>;
}
