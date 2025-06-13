import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from 'src/Dtos/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(user: UserDto): Promise<void> {
    const newUser = this.usersRepository.create({
      name: user.name,
      email: user.email,
      password: user.password,
      address: user.address,
      phone: user.phone,
      country: user.country,
      city: user.city,
    });
    const userFound = await this.usersRepository.findOne({
      where: { email: newUser.email },
    });
    if (userFound) throw new Error('Email ya existe');
    await this.usersRepository.save(newUser);
  }

  async getUsers(page: number, limit: number) {
    let users: User[] = await this.usersRepository.find();
    const start = (page - 1) * limit;
    const finish = start + limit;

    users = users.slice(start, finish);
    return users;
  }
}
