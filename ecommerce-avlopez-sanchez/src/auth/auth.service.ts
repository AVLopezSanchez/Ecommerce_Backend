import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from 'src/Dtos/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
import { LoginDto } from 'src/Dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(user: UserDto): Promise<Omit<User, 'isAdmin'>> {
    const userFound: User | null = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (userFound)
      throw new BadRequestException('Usuario registrado anteriormente');

    if (user.password !== user.password2)
      throw new BadRequestException('Ambas constraseñas deben ser iguales');

    const hashPassword = await bcrypt.hash(user.password, 10);

    const newUser: User = await this.userRepository.save({
      name: user.name,
      email: user.email,
      password: hashPassword,
      phone: user.phone,
      address: user.address,
      country: user.country,
      city: user.city,
    });

    return newUser;
  }

  async loginUser(credentials: LoginDto) {
    const userFound = await this.userRepository.findOne({
      where: { email: credentials.email },
    });
    if (!userFound)
      throw new BadRequestException('Usuario o contraseña invalido');

    const passwordCompare = await bcrypt.compare(
      credentials.password,
      userFound.password,
    );
    if (!passwordCompare)
      throw new BadRequestException('Usuario o contraseña invalido');

    const payload = {
      id: userFound.id,
      email: userFound.email,
      isAdmin: userFound.isAdmin,
    };

    const token = this.jwtService.sign(payload);

    return token;
  }
}
