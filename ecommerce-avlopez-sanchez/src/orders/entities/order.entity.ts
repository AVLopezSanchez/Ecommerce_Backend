import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { v4 as uuid } from 'uuid';
import { OrderDetails } from 'src/order-details/entities/orderDetails.entity';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ManyToOne(() => User, (user) => user.orders_id, { nullable: false })
  @JoinColumn()
  user: User;

  @Column({ type: 'date' })
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order_id, {
    cascade: true,
  })
  orderDetails: OrderDetails;
}
