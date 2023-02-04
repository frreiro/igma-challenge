import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { faker } from '@faker-js/faker';
import { PrismaModule } from '../src/config/prisma/prisma.module';
import { PrismaService } from '../src/config/prisma/prisma.service';

describe('AppController', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule, PrismaModule]
      }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
    await prisma.user.deleteMany();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it('/health check (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect('OK');
  });

  it('/users (POST) with valid cpf', () => {
    const user = {
      name: faker.name.fullName(),
      cpf: '48229839000',
      birthday: new Date()
    };

    return request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201);
  });

  it('/users (POST) given a cpf that already exists on db, should return CONFLICT', async () => {
    const user = {
      name: faker.name.fullName(),
      cpf: '48229839000',
      birthday: new Date()
    };

    await prisma.user.create({ data: user });
    return request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(409);
  });

  it('/users (POST) given a invalid cpf, should throw UNPROCESSABLE_ENTITY', async () => {
    const user = {
      name: faker.name.fullName(),
      cpf: '48229839011',
      birthday: new Date()
    };

    return request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(422);
  });

  it('/users (POST) given a valid cpf in format XXX.XXX.XXX-DD, should valid and return 201', async () => {
    const user = {
      name: faker.name.fullName(),
      cpf: '482.298.390-00',
      birthday: new Date()
    };

    return request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(201);
  });

  it('/users (GET) given 3 users, should return all users', async () => {
    const validCpfs = ['48229839000', '86438234575', '95736145537'];
    const userArr = validCpfs.map(cpf => {
      return {
        name: faker.name.fullName(),
        cpf: cpf,
        birthday: new Date()
      };
    });

    await prisma.user.createMany({
      data: userArr
    });
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(res => {
        expect(res.body.length).toEqual(3);
      });
  });

  it('/users?page (GET) given 6 users, should return 5 users in first page', async () => {
    const validCpfs = [
      '48229839000',
      '86438234575',
      '95736145537',
      '22255713179',
      '19644526350',
      '56806172261'
    ];
    const userArr = validCpfs.map(cpf => {
      return {
        name: faker.name.fullName(),
        cpf: cpf,
        birthday: new Date()
      };
    });

    await prisma.user.createMany({
      data: userArr
    });
    return request(app.getHttpServer())
      .get('/users?page=1')
      .expect(200)
      .expect(res => {
        expect(res.body.length).toEqual(5);
      });
  });
  it('/users?page (GET) given 6 users, should return 1 user in second page', async () => {
    const validCpfs = [
      '48229839000',
      '86438234575',
      '95736145537',
      '22255713179',
      '19644526350',
      '56806172261'
    ];
    const userArr = validCpfs.map(cpf => {
      return {
        name: faker.name.fullName(),
        cpf: cpf,
        birthday: new Date()
      };
    });

    await prisma.user.createMany({
      data: userArr
    });
    return request(app.getHttpServer())
      .get('/users?page=2')
      .expect(200)
      .expect(res => {
        expect(res.body.length).toEqual(1);
      });
  });

  it('/users/:cpf (GET) given a cpf that exist in database, should return a user', async () => {
    const validCpfs = ['48229839000'];
    const userArr = validCpfs.map(cpf => {
      return {
        name: faker.name.fullName(),
        cpf: cpf,
        birthday: new Date()
      };
    });

    await prisma.user.create({
      data: userArr[0]
    });
    return request(app.getHttpServer())
      .get(`/users/${validCpfs[0]}`)
      .expect(200)
      .expect(res => {
        expect(res.body.cpf).toEqual(validCpfs[0]);
      });
  });

  it('/users/:cpf (GET) given a cpf that not exist in database, should return a NO_CONTENT', async () => {
    const validCpfs = ['48229839000'];

    return request(app.getHttpServer())
      .get(`/users/${validCpfs[0]}`)
      .expect(204);
  });
});
