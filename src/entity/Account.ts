export class Account {
  constructor(
    readonly account_id: string,
    readonly name: string,
    readonly email: string,
    readonly cpf: string,
    readonly car_plate: string,
    readonly is_passenger: boolean,
    readonly is_driver: boolean
  ) {}
}
