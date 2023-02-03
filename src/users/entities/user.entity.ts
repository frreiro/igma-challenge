import { CPF } from 'src/validators/cpf/cpf.validator';
export class User {
  readonly id: number;
  name: string;
  cpf: CPF;
  birthday: Date;

  constructor(user: { name: string; cpf: CPF; birthday: Date }) {
    Object.assign(this, user);
  }

  public getName(): string {
    return this.name;
  }

  public getCPF(): string {
    return this.cpf.getCPF();
  }

  public getBirthday(): Date {
    return this.birthday;
  }
}
