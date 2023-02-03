import { Test, TestingModule } from '@nestjs/testing';
import { CPF } from '../../src/validators/cpf/cpf.validator';
import { FakeUser } from '../factory/user.factory';
import { UsersRepository } from '../../src/users/repository/users.repository';
import { UsersService } from '../../src/users/service/users.service';
import { faker } from '@faker-js/faker';

describe('UsersService find', () => {
  let service: UsersService;

  const mockUsersRepository = {
    findAll: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository]
    })
      .overrideProvider(UsersRepository)
      .useValue(mockUsersRepository)
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Given page number, should return should call repository with same page value', async () => {
    const PAGE_NUMBER = Number(faker.random.numeric());
    const mockedFunction = jest
      .spyOn(mockUsersRepository, 'findAll')
      .mockImplementationOnce(input => Promise.resolve(null));

    await service.findAll(PAGE_NUMBER);

    expect(mockedFunction).toBeCalledWith(PAGE_NUMBER);
  });
  it('Given page number less than 0, should call repository function passing page value 1', async () => {
    const PAGE_NUMBER = Number(faker.random.numeric(0));
    const mockedFunction = jest
      .spyOn(mockUsersRepository, 'findAll')
      .mockImplementationOnce(input => Promise.resolve(null));

    await service.findAll(PAGE_NUMBER);

    expect(mockedFunction).toBeCalledWith(1);
  });
  it('No given a page number, should call repository function passing page value 1', async () => {
    const mockedFunction = jest
      .spyOn(mockUsersRepository, 'findAll')
      .mockImplementationOnce(input => Promise.resolve(null));

    await service.findAll();

    expect(mockedFunction).toBeCalledWith(1);
  });
});
