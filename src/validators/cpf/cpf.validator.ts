export class CPF {
  private rawCPF: string | number;
  private cpf: string;

  constructor(cpf: string | number) {
    this.rawCPF = cpf;
    this.cpf = this.checkAndTransform();
  }

  getCPF(): string {
    return this.cpf;
  }

  checkAndTransform(): string {
    const rawCPFString = String(this.rawCPF);
    const regexPattern = /^.*[.-].*$/;
    const hasPeriodAndDash = regexPattern.test(rawCPFString);
    if (hasPeriodAndDash) return rawCPFString.replace(/[.-]/g, '');
    else return rawCPFString;
  }

  isValid(): boolean {
    if (this.cpf.length !== 11) {
      return false;
    }
    const notDigits = this.cpf.slice(0, -2);
    const digits = this.cpf.slice(-2);
    const digitsFound = this.initDigitCalculum(notDigits);
    return digitsFound === digits;
  }

  initDigitCalculum(firstNumbers: string) {
    const firstDigitCalculated = this.calculateDigit([
      ...firstNumbers
    ]);
    const algorismWithFirstDigit = firstNumbers.concat(
      firstDigitCalculated
    );
    const secondDigitCalculted = this.calculateDigit([
      ...algorismWithFirstDigit
    ]);

    return String(firstDigitCalculated).concat(
      String(secondDigitCalculted)
    );
  }

  calculateDigit(numbers: string[]) {
    const multiplication = this.calculateMultiplication(numbers);
    const sum = this.calculateMultiplicationSum(multiplication);
    const digit = this.calculateDigitBySum(sum);
    return String(digit);
  }

  calculateMultiplication(numbers: string[]) {
    let cont = 2;
    const numbersMultiply = numbers
      .reverse()
      .map(number => {
        const multiply = Number(number) * cont;
        cont++;
        return multiply;
      })
      .reverse();

    return numbersMultiply;
  }

  calculateMultiplicationSum(numbers: number[]) {
    return numbers.reduce(
      (lastValue, value) => value + lastValue,
      0
    );
  }

  calculateDigitBySum(sum: number) {
    const rest = sum % 11;
    if (rest < 2) return 0;
    else return 11 - rest;
  }
}
