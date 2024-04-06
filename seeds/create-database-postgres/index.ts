import "dotenv/config";
import pgp from "pg-promise";

(async function createSchemaAndTables() {
  const connection = pgp()(
    `postgres://postgres:postgres@localhost:5432/postgres`
  );
  try {
    const queries = [
      { name: "drop schema", query: "drop schema if exists cccat16 cascade;" },
      { name: "create schema", query: "create schema cccat16;" },
      {
        name: "create table account",
        query:
          "create table cccat16.account (account_id uuid primary key,name text not null,email text not null,cpf text not null,car_plate text null,is_passenger boolean not null default false,is_driver boolean not null default false);",
      },
    ];

    for (const query of queries) {
      console.log("running: ", query.name);
      await connection.query(query.query, []);
    }

    console.log("Database initialized successfully");
  } catch (error) {
    console.log("erro ao rodar query \n\n", error);
  } finally {
    await connection.$pool.end();
    return;
  }
})();
