import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";
import { Payment } from "src/payments/entities/payment.entity";
import { SplitPayment } from "src/split-payments/entities/split-payment.entity";

/**
 * ユーザを表すエンティティ
 */
@Entity()
export class User {
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
   * 支払い
   */
  @OneToMany(() => Payment, (payment) => payment.payer, {
    nullable: false,
  })
  payments: Relation<Payment[]>;

  /**
   * 割り勘
   */
  @OneToMany(() => SplitPayment, (splitPayment) => splitPayment.contributor, {
    nullable: false,
  })
  splitPayments: Relation<SplitPayment>;

  /**
   * コンストラクタ
   * @param partial 部分型
   */
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
