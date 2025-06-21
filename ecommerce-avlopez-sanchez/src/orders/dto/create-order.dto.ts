import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Product } from 'src/products/product.entity';

export class dataOrderDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

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
      },
    },
    example: [{ id: 1111111111111 }, { id: 2222222222222 }],
  })
  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Product>[];
}
