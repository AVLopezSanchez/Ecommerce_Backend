import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'payment' })
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string;

  @Column()
  status_detail: string;

  @Column()
  transaction_amount: number;

  @Column()
  currency_id: string;

  @Column()
  date_created: string;
}
