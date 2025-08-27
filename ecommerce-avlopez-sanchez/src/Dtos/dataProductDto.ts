import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class DataProductDto {
  @ApiProperty({
    example: 'Iphone 16',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Telefono Inteligente',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 230,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 12,
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty({
    example: 4,
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: 'image.jpg',
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  imgUrl: string;

  @ApiProperty({
    example: 'smartphone',
  })
  @IsNotEmpty()
  @IsString()
  category: string;
}
