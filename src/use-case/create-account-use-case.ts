import { Account } from "../entity/Account";
import { IAccountRepository } from "../repository/AccountRepository/IAccountRepository";
import { validate } from "../validateCpf";

export class CreateAccountUseCase {
  constructor(private readonly accountRepository: IAccountRepository) {}

  async execute(input: Input): Promise<{ account_id: string }> {
    if (!input.name || !input.name.match(/[a-zA-Z] [a-zA-Z]+/))
      throw new Error("Nome inválido");

    if (!input.email || !input.email.match(/^(.+)@(.+)$/))
      throw new Error("Email inválido");

    if (!validate(input.cpf)) throw new Error("Cpf inválido");

    if (
      (!input.isPassenger && !input.isDriver) ||
      (input.isDriver && input.isPassenger)
    )
      throw new Error("Tipo de conta inválido");

    if (input.isDriver)
      if (!input.carPlate?.match(/[A-Z]{3}[0-9]{4}/))
        throw new Error("Placa inválida");

    const hasUserWithEmail = await this.accountRepository.findByEmail(
      input.email
    );

    const hasUserWithCpf = await this.accountRepository.findByCpf(input.cpf!);

    if (hasUserWithEmail?.email)
      throw new Error("Usuário já cadastrado com esse email");

    if (hasUserWithCpf?.cpf)
      throw new Error("Usuário já cadastrado com esse cpf");

    const account_id = crypto.randomUUID();

    const account = new Account(
      account_id,
      input.name,
      input.email,
      input.cpf!,
      input.carPlate ? input.carPlate : "",
      input.isPassenger ? input.isPassenger : false,
      input.isDriver ? input.isDriver : false
    );

    await this.accountRepository.save(account);
    return { account_id };
  }
}

type Input = {
  name: string;
  email: string;
  cpf?: string;
  isPassenger?: boolean;
  carPlate?: string;
  isDriver?: boolean;
};
