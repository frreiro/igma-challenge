import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersRepository } from './repository/users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [PrismaModule]
})
export class UsersModule {}
