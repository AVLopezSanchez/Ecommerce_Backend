import { IsNotEmpty, IsEmail, IsStrongPassword, Length } from 'class-validator';

export class LoginDto {
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
  @Length(3, 80)
  password: string;
}
