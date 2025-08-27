import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './upload-image.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOneBy({ id: productId });

    if (!product) throw new NotFoundException('No se encontro el producto');

    const uploadResponse = await this.fileUploadRepository.uplaodImage(file);

    product.imgUrl = uploadResponse.secure_url;
    const updateProduct = await this.productsRepository.save(product);

    return updateProduct;
  }

  async uploadPerfilImage(file: Express.Multer.File, userId: string) {
    const user: User | null = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user)
      throw new NotFoundException(`El usuario con id ${userId} no existe`);

    const uploadResponse = await this.fileUploadRepository.uplaodImage(file);

    user.perfilImg = uploadResponse.url;
    const updateUser: User = await this.userRepository.save(user);

    return updateUser;
  }
}
