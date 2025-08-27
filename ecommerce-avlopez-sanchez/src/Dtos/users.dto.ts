import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class UserDto {
  @ApiProperty({
    example: 'Maria Perez',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  name: string;

  /**
   * @example mariaperez@gmail.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * @example Contraseña1234+
   */
  @IsNotEmpty()
  @IsStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Length(3, 15)
  password: string;

  /**
   * @example Contraseña1234+
   */
  @IsNotEmpty()
  @IsStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Length(3, 15)
  password2: string;

  @ApiProperty({
    example: 'calle principal 123',
  })
  @IsString()
  @Length(3, 80)
  address: string;

  /**
   * @example 12025551234
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * @example Venezuela
   */
  @IsString()
  @Length(5, 20)
  country?: string;

  /**
   * @example Maracaibo
   */
  @IsString()
  @Length(5, 20)
  city?: string;

  
}

// CreateUserDto

// name: Se requiere que el nombre no esté vacío, sea una cadena de al menos 3 caracteres y no supere los 80 caracteres de longitud.

// email: El correo electrónico debe tener una estructura válida según el estándar de direcciones de correo electrónico.

// password: La contraseña debe cumplir con los siguientes criterios:

// Debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*

// Debe tener una longitud mínima de 8 caracteres y una longitud máxima de 15 caracteres.

// address: La dirección debe tener una longitud mínima de 3 caracteres y no superar los 80 caracteres de longitud.

// phone: El número de teléfono debe estar presente y ser un número.

// country: El país debe ser una cadena de texto de al menos 5 caracteres y no superar los 20 caracteres de longitud.

// city: La ciudad debe ser una cadena de texto de al menos 5 caracteres y no superar los 20 caracteres de longitud.
