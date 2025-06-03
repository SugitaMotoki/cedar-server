import { User } from "../interfaces/user.interface";

export class CreateUserDto implements User {
  name: string;
  birthday: Date;
  password: string;
}
