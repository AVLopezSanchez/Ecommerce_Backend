import { Orders } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @OneToOne(() => Orders, (order) => order.orderDetails, {
    nullable: false,
  })
  @JoinColumn({ name: 'order_id' })
  order_id: Orders;

  @ManyToMany(() => Product, (product) => product.orderDetails, {
    nullable: false,
  })
  @JoinTable()
  products: Product[];
}
