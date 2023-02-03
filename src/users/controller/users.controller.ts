import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('passeo');
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query('page') page?: number) {
    return this.usersService.findAll(page);
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.usersService.findByCpf(cpf);
  }
}
