import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { Product } from 'src/products/product.entity';
import { Status } from '../status.enum';

export class dataOrderDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsEmpty()
  status: Status;

  @ApiProperty({
    description: 'Array de objetos con ID de productos',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          example: 1111111111111,
        },
        quantity: {
          type: 'number',
          example: 4,
        },
      },
    },
    example: [
      { id: 1111111111111, quantity: 3 },
      { id: 2222222222222, quantity: 2 },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Product>[];
}
