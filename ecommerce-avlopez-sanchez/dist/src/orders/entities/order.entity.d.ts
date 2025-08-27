import { User } from '../../users/user.entity';
import { OrderDetails } from 'src/order-details/entities/orderDetails.entity';
import { Status } from '../status.enum';
export declare class Orders {
    id: string;
    user: User;
    date: Date;
    status: Status;
    orderDetails: OrderDetails;
}
