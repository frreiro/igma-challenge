import { faker } from '@faker-js/faker';
import { User } from '../../src/users/entities/user.entity';
import { CPF } from '../../src/validators/cpf/cpf.validator';

export class FakeUser extends User {
  constructor(cpf: CPF) {
    super({
      name: faker.name.fullName(),
      birthday: faker.date.birthdate(),
      cpf: cpf
    });
  }
}
