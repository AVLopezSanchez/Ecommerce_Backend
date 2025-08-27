import { FileUploadRepository } from './upload-image.repository';
import { Product } from 'src/products/product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
export declare class FileUploadService {
    private productsRepository;
    private readonly fileUploadRepository;
    private userRepository;
    constructor(productsRepository: Repository<Product>, fileUploadRepository: FileUploadRepository, userRepository: Repository<User>);
    uploadImage(file: Express.Multer.File, productId: string): Promise<Product>;
    uploadPerfilImage(file: Express.Multer.File, userId: string): Promise<User>;
}
