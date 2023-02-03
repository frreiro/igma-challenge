import { Test, TestingModule } from '@nestjs/testing';
import { CPF } from '../../src/validators/cpf/cpf.validator';
import { FakeUser } from '../factory/user.factory';
import { UsersRepository } from '../../src/users/repository/users.repository';
import { UsersService } from '../../src/users/service/users.service';
import { faker } from '@faker-js/faker';

describe('UsersService create', () => {
  let service: UsersService;

  const mockUsersRepository = {
    findByCpf: jest.fn(),
    insert: jest.fn()
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Given a valid cpf, should return the same object with an id', async () => {
    const VALID_CPF = '74551920614';
    const validCPF = new CPF(VALID_CPF);
    const fakeUser = new FakeUser(validCPF);
    jest
      .spyOn(mockUsersRepository, 'insert')
      .mockImplementationOnce(input =>
        Promise.resolve({
          id: Number(faker.random.numeric()),
          ...input
        })
      );
    jest
      .spyOn(mockUsersRepository, 'findByCpf')
      .mockImplementationOnce(input => Promise.resolve(null));

    const fakeService = await service.create({
      name: fakeUser.getName(),
      birthday: fakeUser.getBirthday(),
      cpf: fakeUser.getCPF()
    });

    expect(fakeService).toEqual({
      id: expect.any(Number),
      name: fakeUser.getName(),
      cpf: fakeUser.getCPF(),
      birthday: fakeUser.getBirthday()
    });
  });

  it('Given a invalid cpf, should throw HttpException with CPF must be valid massage', async () => {
    const INVALID_CPF = '74551920612';
    const invalidCPF = new CPF(INVALID_CPF);
    const fakeUser = new FakeUser(invalidCPF);

    const fakeCreation = service.create({
      name: fakeUser.getName(),
      birthday: fakeUser.getBirthday(),
      cpf: fakeUser.getCPF()
    });

    await expect(fakeCreation).rejects.toThrow('CPF must be valid');
  });

  it('Given a valid cpf,but already registred, should throw HttpException with Conflict message', async () => {
    const VALID_CPF = '74551920614';
    const validCPF = new CPF(VALID_CPF);
    const fakeUser = new FakeUser(validCPF);
    jest
      .spyOn(mockUsersRepository, 'findByCpf')
      .mockImplementationOnce(input => {
        return Promise.resolve({
          id: Number(faker.random.numeric()),
          name: fakeUser.getName(),
          birthday: fakeUser.getBirthday(),
          cpf: fakeUser.getCPF()
        });
      });

    const fakeCreation = service.create({
      name: fakeUser.getName(),
      birthday: fakeUser.getBirthday(),
      cpf: fakeUser.getCPF()
    });

    await expect(fakeCreation).rejects.toThrow('Conflict');
  });
});
