import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Length(3, 80)
  password: string;

  @IsString()
  @Length(3, 80)
  address: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsString()
  @Length(5, 20)
  country?: string;

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
