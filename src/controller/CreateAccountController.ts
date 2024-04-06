import { Request, Response } from "express";
import { CreateAccountUseCase } from "../use-case/create-account-use-case";

export class CreateAccountController {
  constructor(private createAccountUseCase: CreateAccountUseCase) {}

  async handle(request: Request, response: Response) {
    const { name, email, cpf, carPlate, isPassenger, isDriver } = request.body;

    try {
      await this.createAccountUseCase.execute({
        name,
        email,
        cpf,
        carPlate,
        isPassenger,
        isDriver,
      });

      return response.status(201).send();
    } catch (err) {
      if (err instanceof Error) {
        return response.status(422).json({ error: err.message });
      }
      return response.status(500).send();
    }
  }
}
