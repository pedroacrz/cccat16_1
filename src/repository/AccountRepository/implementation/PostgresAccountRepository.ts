import "dotenv/config";
import pgp from "pg-promise";
import { Account } from "../../../entity/Account";
import { IAccountRepository } from "../IAccountRepository";

class PostgresAccountRepository implements IAccountRepository {
  constructor() {}
  async findByEmail(email: string): Promise<Account | undefined> {
    const connection = await pgp()(
      `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/postgres`
    );

    const [account] = await connection.query(
      "select * from cccat16.account where email = $1",
      [email]
    );

    await connection.$pool.end();
    return account;
  }

  async findByCpf(cpf: string): Promise<Account | undefined> {
    const connection = await pgp()(
      `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/postgres`
    );

    const [account] = await connection.query(
      "select * from cccat16.account where cpf = $1",
      [cpf]
    );

    await connection.$pool.end();
    return account;
  }

  async save(account: Account): Promise<void> {
    const connection = await pgp()(
      `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/postgres`
    );
    await connection.query(
      "insert into cccat16.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)",
      [
        account.account_id,
        account.name,
        account.email,
        account.cpf,
        account.car_plate,
        !!account.is_passenger,
        !!account.is_driver,
      ]
    );

    await connection.$pool.end();
    return;
  }
}

export { PostgresAccountRepository };
