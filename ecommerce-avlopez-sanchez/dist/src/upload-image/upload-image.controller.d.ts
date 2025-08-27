import { FileUploadService } from './upload-image.service';
export declare class FileUploadController {
    private readonly fileUploadService;
    constructor(fileUploadService: FileUploadService);
    uploadFile(productId: string, file: Express.Multer.File): Promise<import("../products/product.entity").Product>;
    uploadPerfilImage(userId: string, file: Express.Multer.File): Promise<import("../users/user.entity").User>;
}
