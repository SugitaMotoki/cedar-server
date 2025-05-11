import { Check, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User as IUser } from "../interfaces/user.interface";

/**
 * ユーザを表すエンティティ
 */
@Entity()
export class User implements IUser {
  /**
   * ID
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 名前
   */
  @Check("name <> ''")
  @Column({
    type: "varchar",
  })
  name: string;

  /**
   * コンストラクタ
   * @param partial 部分型
   */
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
