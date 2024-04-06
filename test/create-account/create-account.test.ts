import { InMemoryAccountRepository } from "../../src/repository/AccountRepository/implementation/InMemoryAccountRepository";
import { CreateAccountUseCase } from "../../src/use-case/create-account-use-case";

describe("Create Account Use Case", () => {
  test("should be able to create passager account", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: "87748248800",
      isPassenger: true,
    };

    const accountRepository = new InMemoryAccountRepository();
    const createAccountUseCase = new CreateAccountUseCase(accountRepository);

    const response = await createAccountUseCase.execute(input);
    expect(response.account_id).toBeDefined();
  });

  test("should not be able to create passager account with same email", async () => {
    const email = `john.doe@gmail.com`;
    const input = {
      name: "John Doe",
      email,
      cpf: "97456321558",
      isPassenger: true,
    };

    const accountRepository = new InMemoryAccountRepository();
    const createAccountUseCase = new CreateAccountUseCase(accountRepository);

    await createAccountUseCase.execute(input);
    await expect(() => createAccountUseCase.execute(input)).rejects.toThrow(
      "Usuário já cadastrado com esse email"
    );
  });

  test("should not be able to create passager account with same cpf", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: "87748248800",
      isPassenger: true,
    };

    const accountRepository = new InMemoryAccountRepository();
    const createAccountUseCase = new CreateAccountUseCase(accountRepository);

    await createAccountUseCase.execute(input);

    input.email = `john.doe${Math.random()}@gmail.com`;

    await expect(() =>
      createAccountUseCase.execute(input)
    ).rejects.toThrowError("Usuário já cadastrado com esse cpf");
  });

  test("should not be able to create passager account without name", async () => {
    const input = {
      name: "john",
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: "87748248800",
      isPassenger: true,
    };

    const accountRepository = new InMemoryAccountRepository();
    const createAccountUseCase = new CreateAccountUseCase(accountRepository);

    await expect(() => createAccountUseCase.execute(input)).rejects.toThrow(
      "Nome inválido"
    );
  });

  test("should not be able to create passager account with email invalid", async () => {
    const input = {
      name: "John Doe",
      email: `john.com`,
      cpf: "87748248800",
      isPassenger: false,
      isDriver: true,
      carPlate: "ABC1999",
    };

    const accountRepository = new InMemoryAccountRepository();
    const createAccountUseCase = new CreateAccountUseCase(accountRepository);

    await expect(() => createAccountUseCase.execute(input)).rejects.toThrow(
      "Email inválido"
    );
  });

  test("should not be able to create passager account with cpf invalid", async () => {
    const input = {
      name: "John Doe",
      email: `john${Math.random()}@john.com`,
      cpf: "87748248830",
      isPassenger: true,
    };

    const accountRepository = new InMemoryAccountRepository();
    const createAccountUseCase = new CreateAccountUseCase(accountRepository);

    await expect(() => createAccountUseCase.execute(input)).rejects.toThrow(
      "Cpf inválido"
    );
  });

  test("should not be able to create driver account with carPlate  invalid", async () => {
    const input = {
      name: "John Doe",
      email: `john${Math.random()}@john.com`,
      cpf: "87748248800",
      isPassenger: false,
      isDriver: true,
      carPlate: "ABC199",
    };

    const accountRepository = new InMemoryAccountRepository();
    const createAccountUseCase = new CreateAccountUseCase(accountRepository);

    await expect(() => createAccountUseCase.execute(input)).rejects.toThrow(
      "Placa inválida"
    );
  });
});
