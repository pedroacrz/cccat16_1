import { Account } from "../../../entity/Account";
import { IAccountRepository } from "../IAccountRepository";

class InMemoryAccountRepository implements IAccountRepository {
  private accounts: Account[] = [];

  constructor() {}

  async findByEmail(email: string): Promise<Account | undefined> {
    return this.accounts.find((account) => account.email === email);
  }
  async findByCpf(cpf: string): Promise<Account | undefined> {
    return this.accounts.find((account) => account.cpf === cpf);
  }
  async save(account: Account): Promise<void> {
    this.accounts.push(account);
  }
}

export { InMemoryAccountRepository };
