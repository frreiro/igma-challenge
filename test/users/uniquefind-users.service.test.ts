import { Test, TestingModule } from '@nestjs/testing';
import { CPF } from '../../src/validators/cpf/cpf.validator';
import { FakeUser } from '../factory/user.factory';
import { UsersRepository } from '../../src/users/repository/users.repository';
import { UsersService } from '../../src/users/service/users.service';

describe('UsersService create', () => {
  let service: UsersService;

  const mockUsersRepository = {
    findByCpf: jest.fn()
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

  it('Given a cpf, should return a user', async () => {
    const VALID_CPF = '74551920614';
    const validCPF = new CPF(VALID_CPF);
    const fakeUser = new FakeUser(validCPF);
    const user = {
      id: expect.any(Number),
      name: fakeUser.getName(),
      cpf: fakeUser.getCPF(),
      birthday: fakeUser.getBirthday()
    };
    jest
      .spyOn(mockUsersRepository, 'findByCpf')
      .mockImplementationOnce(input => Promise.resolve(user));

    const fakeService = await service.findByCpf(fakeUser.getCPF());

    expect(fakeService).toEqual(user);
  });

  it('Given a invalid cpf, should throw HttpException with No users found massage', async () => {
    const INVALID_CPF = '74551920612';
    const invalidCPF = new CPF(INVALID_CPF);
    const fakeUser = new FakeUser(invalidCPF);

    jest
      .spyOn(mockUsersRepository, 'findByCpf')
      .mockImplementationOnce(input => Promise.resolve(null));

    const fakeService = service.findByCpf(fakeUser.getCPF());

    await expect(fakeService).rejects.toThrow('No users found');
  });
});
