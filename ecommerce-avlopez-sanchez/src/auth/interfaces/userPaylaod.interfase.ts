import { Role } from 'src/roles.enum';

export interface UserPayload {
  id: string;
  email: string;
  isAdmin: boolean;
  roles: Role[];
}
