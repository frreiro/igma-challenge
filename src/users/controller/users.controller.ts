import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.usersService.findByCpf(cpf);
  }
}
