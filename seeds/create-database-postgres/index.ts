import "dotenv/config";
import pgp from "pg-promise";

(async function createSchemaAndTables() {
  const connection = pgp()(
    `postgres://postgres:postgres@localhost:5432/postgres`
  );

  await connection.query(
    `
    drop schema cccat16 cascade;

    create schema cccat16;

    create table cccat16.account (
        account_id uuid primary key,
        name text not null,
        email text not null,
        cpf text not null,
        car_plate text null,
        is_passenger boolean not null default false,
        is_driver boolean not null default false
    );
    `,
    []
  );

  await connection.$pool.end();
  return;
})();
