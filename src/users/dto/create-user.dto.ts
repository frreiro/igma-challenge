import { User as UserPrisma } from '@prisma/client';

export class CreateUserDto implements Omit<UserPrisma, 'id'> {
  name: string;
  cpf: string;
  birthday: Date;
}
