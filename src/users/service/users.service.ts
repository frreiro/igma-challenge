import {
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common';
import { CPF } from '../../../src/validators/cpf/cpf.validator';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { User as UserPrisma } from '@prisma/client';

import { UsersRepository } from '../repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserPrisma> {
    const date = new Date(createUserDto.birthday);
    const cpf = new CPF(createUserDto.cpf);

    if (Date.now() - date.getTime() < 0) {
      throw new HttpException(
        'Date must be valid',
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    if (!cpf.isValid()) {
      throw new HttpException(
        'CPF must be valid',
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const user = new User({
      name: createUserDto.name,
      cpf: cpf,
      birthday: date
    });

    const userDb = await this.userRepository.findByCpf(
      user.getCPF()
    );
    if (userDb) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    return await this.userRepository.insert({
      name: user.getName(),
      birthday: user.getBirthday(),
      cpf: user.getCPF()
    });
  }

  async findAll(page?: number): Promise<UserPrisma[]> {
    let pageNumber: number;
    if (!page || page <= 0) {
      pageNumber = 1;
    } else {
      pageNumber = page;
    }
    const users = await this.userRepository.findAll(pageNumber);
    return users;
  }

  async findByCpf(cpf: string): Promise<UserPrisma> {
    const user = await this.userRepository.findByCpf(cpf);

    if (!user) {
      throw new HttpException(
        'No users found',
        HttpStatus.NO_CONTENT
      );
    }
    return user;
  }
}
