// import { Injectable } from '@nestjs/common';
// import { Products } from './productsInterface';
// import { ProductsDto } from 'src/Dtos/productDto';

// @Injectable()
// export class ProductsRepository {
//   products: Products[] = [
//     {
//       id: 1,
//       name: 'Camiseta básica',
//       description: 'Camiseta de algodón 100% en colores variados.',
//       price: 15.99,
//       stock: true,
//       imgUrl: 'https://ejemplo.com/imagenes/camiseta.jpg',
//     },
//     {
//       id: 2,
//       name: 'Zapatos deportivos',
//       description: 'Zapatos cómodos para correr y hacer ejercicio.',
//       price: 49.99,
//       stock: true,
//       imgUrl: 'https://ejemplo.com/imagenes/zapatos.jpg',
//     },
//     {
//       id: 3,
//       name: 'Mochila escolar',
//       description: 'Mochila resistente con múltiples compartimentos.',
//       price: 29.99,
//       stock: false,
//       imgUrl: 'https://ejemplo.com/imagenes/mochila.jpg',
//     },
//     {
//       id: 4,
//       name: 'Auriculares inalámbricos',
//       description:
//         'Auriculares con cancelación de ruido y batería de larga duración.',
//       price: 89.99,
//       stock: true,
//       imgUrl: 'https://ejemplo.com/imagenes/auriculares.jpg',
//     },
//   ];

//   identificador: number = 5;

//   getProducts() {
//     return this.products;
//   }

//   getProductById(id: string) {
//     return this.products.find((product) => product.id === Number(id));
//   }

//   createProduct(product: ProductsDto): number {
//     const id = this.identificador;
//     const newProduct = {
//       id,
//       ...product,
//     };
//     this.products.push(newProduct);
//     this.identificador++;
//     return newProduct.id;
//   }

//   updateProductById(id: string) {
//     const productFound: Products | undefined = this.products.find(
//       (product) => product.id === Number(id),
//     );
//     if (productFound) {
//       productFound.description = 'producto modificado';
//       return productFound.id;
//     } else return `Producto con id ${id} no encontrado`;
//   }

//   deleteProductById(id: string) {
//     const productFound: Products | undefined = this.products.find(
//       (product) => product.id === Number(id),
//     );
//     const newProducts: Products[] = this.products.filter(
//       (product) => product.id !== Number(id),
//     );
//     this.products = newProducts;
//     if (productFound) {
//       return productFound.id;
//     }
//   }
// }
