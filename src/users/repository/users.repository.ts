import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { IUserRepository } from './IUsers.repository';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async insert(user: User): Promise<void> {
    await this.prisma.user.create({
      data: user
    });
  }

  async findAll(page: number): Promise<User[]> {
    return await this.prisma.user.findMany({
      skip: (page - 1) * 5,
      take: 5
    });
  }

  async findByCpf(cpf: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        cpf: cpf
      }
    });
  }
}
