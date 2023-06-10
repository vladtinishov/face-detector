export class UpdateUserDto {
  name?: string;
  login?: string;
  password?: string;
}

export class CreateUserDto {
  name: string;
  login: string;
  password: string;
}
