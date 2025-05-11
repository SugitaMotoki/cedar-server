import { User } from "../interfaces/user.interface";

export class CreateUserDto implements User {
  /**
   * 名前
   */
  name: string;
}
