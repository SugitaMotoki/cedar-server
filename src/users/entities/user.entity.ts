import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
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
  userId: number;

  /**
   * 名前
   */
  @Check("name <> ''")
  @Column({
    type: "varchar",
  })
  name: string;

  /**
   * 誕生日
   */
  @Column({
    type: "date",
  })
  birthday: Date;

  /**
   * パスワード
   */
  @Check("password <> ''")
  @Column({
    type: "varchar",
    length: 126,
  })
  password: string;

  /**
   * 作成日（ORMが自動生成）
   */
  @CreateDateColumn({
    update: false,
  })
  createdAt: Date;

  /**
   * 更新日（ORMが自動生成）
   */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * コンストラクタ
   * @param partial 部分型
   */
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
