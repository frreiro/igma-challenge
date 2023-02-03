import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const date = new Date(createUserDto.birthday);
    const user = new User({
      name: createUserDto.name,
      cpf: createUserDto.cpf,
      birthday: date
    });
    await this.userRepository.insert(user);
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  findByCpf(cpf: string) {
    return this.userRepository.findByCpf(cpf);
  }
}
