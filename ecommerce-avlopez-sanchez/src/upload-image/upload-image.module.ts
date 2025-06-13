import { Module } from '@nestjs/common';
import { FileUploadService } from './upload-image.service';
import { FileUploadController } from './upload-image.controller';
import { CloudinaryConfig } from 'src/config/claudinaryConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { FileUploadRepository } from './upload-image.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [FileUploadController],
  providers: [FileUploadService, CloudinaryConfig, FileUploadRepository],
})
export class UploadImageModule {}
