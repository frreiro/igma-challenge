import {
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const date = new Date(createUserDto.birthday);
    const user = new User({
      name: createUserDto.name,
      cpf: createUserDto.cpf,
      birthday: date
    });

    const userDb = await this.userRepository.findByCpf(user.cpf);
    if (userDb) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }
    await this.userRepository.insert(user);
  }

  async findAll(page?: number): Promise<User[]> {
    let pageNumber: number;
    if (!page || page <= 0) {
      pageNumber = 1;
    } else {
      pageNumber = page;
    }
    return await this.userRepository.findAll(pageNumber);
  }

  async findByCpf(cpf: string): Promise<User> {
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
