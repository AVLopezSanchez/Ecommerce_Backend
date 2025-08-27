import { UploadApiResponse } from 'cloudinary';
export declare class FileUploadRepository {
    uplaodImage(file: Express.Multer.File): Promise<UploadApiResponse>;
}
