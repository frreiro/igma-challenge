import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUserRepository } from './IUsers.repository';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async insert(user: User): Promise<void> {
    await this.prisma.user.create({
      data: user
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findByCpf(cpf: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        cpf: cpf
      }
    });
  }
}
