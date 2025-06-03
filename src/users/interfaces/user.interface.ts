/**
 * ユーザを表すインターフェース
 */
export interface User {
  /**
   * ID
   */
  readonly userId?: number;

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

  /**
   * 作成日（ORMが自動生成）
   */
  readonly createdAt?: Date;

  /**
   * 更新日（ORMが自動生成）
   */
  readonly updatedAt?: Date;
}
