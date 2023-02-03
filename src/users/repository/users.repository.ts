import { Injectable } from '@nestjs/common';
import { User as UserPrisma } from '@prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { IUserRepository } from './IUsers.repository';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async insert(user: Omit<UserPrisma, 'id'>): Promise<void> {
    await this.prisma.user.create({
      data: user
    });
  }

  async findAll(page: number): Promise<UserPrisma[]> {
    return await this.prisma.user.findMany({
      skip: (page - 1) * 5,
      take: 5
    });
  }

  async findByCpf(cpf: string): Promise<UserPrisma> {
    return await this.prisma.user.findUnique({
      where: {
        cpf: cpf
      }
    });
  }
}
