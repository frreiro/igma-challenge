import { CreateUserDto } from '../dto/create-user.dto';
export class User {
  readonly id: number;
  name: string;
  cpf: string;
  birthday: Date;

  constructor(userDTO: CreateUserDto) {
    Object.assign(this, userDTO);
  }
}
