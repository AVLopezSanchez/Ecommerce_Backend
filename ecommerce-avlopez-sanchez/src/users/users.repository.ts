// import { Injectable } from '@nestjs/common';
// import { User } from './usersInterface';
// import { UserDto } from 'src/Dtos/users.dto';

// @Injectable()
// export class UsersRepository {
//   private users: User[] = [
//     {
//       id: 1,
//       email: 'juan.perez@example.com',
//       name: 'Juan Perez',
//       password: 'password123',
//       address: 'Calle Falsa 123',
//       phone: '555-1234',
//       country: 'Argentina',
//       city: 'Buenos Aires',
//     },
//     {
//       id: 2,
//       email: 'maria.gomez@example.com',
//       name: 'Maria Gomez',
//       password: 'securePass!',
//       address: 'Avenida Siempre Viva 742',
//       phone: '555-5678',
//       country: 'Colombia',
//       city: 'Bogotá',
//     },
//     {
//       id: 3,
//       email: 'luis.martin@example.com',
//       name: 'Luis Martin',
//       password: 'abc12345',
//       address: 'Calle Luna 456',
//       phone: '555-9012',
//       // country y city son opcionales
//     },
//     {
//       id: 4,
//       email: 'ana.lopez@example.com',
//       name: 'Ana Lopez',
//       password: 'pass9876',
//       address: 'Avenida Sol 789',
//       phone: '555-3456',
//       country: 'México',
//       // city también opcional
//     },
//   ];

//   identificador: number = 5;

//   getUsers() {
//     return this.users;
//   }

//   getUserById(id: string): Omit<User, 'password'> | undefined {
//     const user: Omit<User, 'password'> | undefined = this.users.find(
//       (user) => user.id === Number(id),
//     );
//     return user;
//   }

//   createUser(user: UserDto): number {
//     const id = this.identificador;
//     const newUser: User = {
//       id,
//       ...user,
//     };
//     this.users.push(newUser);
//     this.identificador++;
//     return newUser.id;
//   }

//   updateUserById(id: string) {
//     const userFound: User | undefined = this.users.find(
//       (user) => user.id === Number(id),
//     );
//     if (userFound) {
//       return userFound.id;
//     } else return `usuario con id ${id} no encontrado`;
//   }

//   deleteUserById(id: string) {
//     const userFound: User | undefined = this.users.find(
//       (user) => user.id === Number(id),
//     );
//     const newUsers: User[] = this.users.filter(
//       (user) => user.id !== Number(id),
//     );
//     this.users = newUsers;
//     if (userFound) {
//       return userFound.id;
//     }
//   }
// }
