export class CreateUserDto {
  /**
   * 名前
   */
  name: string;

  /**
   * 誕生日
   */
  birthday: Date;

  /**
   * パスワード
   */
  password: string;
}
