import { Request, Router, Response } from "express";
import { CreateAccountController } from "../controller/CreateAccountController";
import { CreateAccountUseCase } from "../use-case/create-account-use-case";
import { InMemoryAccountRepository } from "../repository/AccountRepository/implementation/InMemoryAccountRepository";
import { PostgresAccountRepository } from "../repository/AccountRepository/implementation/PostgresAccountRepository";
const account_router = Router();

account_router.post("/", (request: Request, response: Response) => {
  const accountRepository = new PostgresAccountRepository();
  const createAccountUseCase = new CreateAccountUseCase(accountRepository);
  return new CreateAccountController(createAccountUseCase).handle(
    request,
    response
  );
});

export { account_router };
