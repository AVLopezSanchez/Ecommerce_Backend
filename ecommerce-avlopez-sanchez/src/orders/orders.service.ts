import { Injectable, NotFoundException } from '@nestjs/common';
import { Orders } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';
import { OrderDetails } from 'src/order-details/entities/orderDetails.entity';
import { dataOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
  ) {}

  async addOrder(dataOrder: dataOrderDto): Promise<Orders[]> {
    const user: User | null = await this.usersRepository.findOne({
      where: { id: dataOrder.userId },
    });
    if (!user) throw new Error('El usuario no existe');

    const newOrder: Orders = this.ordersRepository.create({
      date: new Date(),
      user: user,
    });
    await this.ordersRepository.save(newOrder);

    let totalPrice = 0;

    const productArr = await Promise.all(
      dataOrder.products.map(async (element) => {
        const product: Product | null = await this.productsRepository.findOne({
          where: { id: element?.id },
        });

        if (!product) throw new NotFoundException('No exist el producto');

        await this.productsRepository.update(
          { id: element?.id },
          { stock: product.stock - 1 },
        );

        if (!product.stock)
          throw new NotFoundException('Producto no tiene stock');

        totalPrice = Number(totalPrice + product.price);

        return product;
      }),
    );

    const newOrderDetail = this.orderDetailsRepository.create({
      price: Number(totalPrice.toFixed(2)),
      order_id: newOrder,
      products: productArr,
    });

    await this.orderDetailsRepository.save(newOrderDetail);

    return await this.ordersRepository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });
  }
}

// Crear el modelo,controllador, servicio y repositorio para las órdenes de compra (orders), dentro de este repositorio crearemos la lógica necesaria para que un usuario pueda realizar una compra de un “carrito de productos”.

// La orden de compra será recibida mediante una solicitud de HTTP Post al endpoint /orders cuyo cuerpo tendrá la siguiente estructura:

// {

//   "userId":"UUID del usuario",

//   "products":[

//      {

//    "id":"UUID producto 1"

//   },

//   {

//     "id":"UUID producto 2"

//   }

//     ]

// }

// Por ahora los usuarios solo pueden agregar una unidad de cada producto dentro de su carrito.

// En el repositorio de orders tendrás que crear 2 métodos diferentes getOrder y addOrder.

// addOrder

// Busca a un usuario por id.

// Crea un registro en la tabla orders con el usuario encontrado.

// Construye y registra un detalle de compra con los productos seleccionados.

// Busca los productos por id recibidos en la request actualizando el total de la compra y reduciendo el stock del producto. correspondiente. (al realizar la búsqueda de todos los productos aquellos con stock igual a 0 no deben ser mostrados).

// Devuelve la orden de compra con el precio y id del detalle de compra.

// getOrder

// Busca una orden recibida por id.

// Devuelve un objeto con la orden y los detalles de la orden (el detalle de la orden debe contener un array con todos los productos adquiridos).
