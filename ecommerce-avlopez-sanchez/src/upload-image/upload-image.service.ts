import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './upload-image.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private readonly fileUploadRepository: FileUploadRepository,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOneBy({ id: productId });

    if (!product) throw new NotFoundException('No se encontro el producto');

    const uploadResponse = await this.fileUploadRepository.uplaodImage(file);

    await this.productsRepository.update(product.id, {
      imgUrl: uploadResponse.url,
    });

    const updateproduct = await this.productsRepository.findOneBy({
      id: productId,
    });

    return updateproduct;
  }
}
