import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";
import { User } from "src/users/entities/user.entity";

/**
 * 支払いを表すエンティティ
 */
@Entity()
export class Payment {
  /**
   * ID
   */
  @PrimaryGeneratedColumn()
  paymentId: number;

  /**
   * 名前
   */
  @Check("name <> ''")
  @Column({
    type: "varchar",
  })
  name: string;

  /**
   * 支払ったユーザ
   */
  @ManyToOne(() => User, (user) => user.payments, {
    nullable: false,
  })
  payer: Relation<User>;

  /**
   * 支払ったユーザが負担すべき金額
   */
  @Column({
    type: "int",
  })
  payerCost: number;

  /**
   * 精算済みかどうか
   */
  @Column({
    type: "boolean",
  })
  isSettled: boolean;

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
  constructor(partial?: Partial<Payment>) {
    Object.assign(this, partial);
  }
}
