import { User } from '@prisma/client';

export interface IUserRepository {
  insert(user: User): Promise<void>;
  findAll(page: number): Promise<User[]>;
  findByCpf(cpf: User['cpf']): Promise<User>;
}