import { Account } from "../../entity/Account";

export interface IAccountRepository {
  findByEmail(email: string): Promise<Account | undefined>;
  findByCpf(cpf: string): Promise<Account | undefined>;
  save(account: Account): Promise<void>;
}
