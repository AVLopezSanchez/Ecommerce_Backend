import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getUsers(page: number, limit: number) {
    let users: User[] = await this.usersRepository.find();

    const start = (page - 1) * limit;
    const finish = start + limit;

    users = users.slice(start, finish);

    return users;
  }

  async getUserById(id: string) {
    const userFound = await this.usersRepository.findOneBy({ id });

    if (!userFound)
      throw new NotFoundException(`El usuario con id: ${id} no fue encontrado`);

    return userFound;
  }

  async changeUserRole(userId: string, role: boolean) {
    // buscar el usuario, modificar el role, guardar el cambio
    const user: User | null = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user)
      throw new NotFoundException(`El usuario con id ${userId} no existe`);

    user.isAdmin = role;
    await this.usersRepository.save(user);

    return user;
  }
}
