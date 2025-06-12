import { Payment } from "src/payments/entities/payment.entity";
import { User } from "src/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
  UpdateDateColumn,
} from "typeorm";

/**
 * 割り勘を表すエンティティ
 */
@Entity()
@Unique(["contributor", "payment"])
export class SplitPayment {
  /**
   * ID
   */
  @PrimaryGeneratedColumn()
  splitPaymentId: number;

  /**
   * 割り勘した支払い
   */
  @ManyToOne(() => Payment, (payment) => payment.splitPayments, {
    nullable: false,
  })
  payment: Relation<Payment>;

  /**
   * 割り勘相手
   */
  @ManyToOne(() => User, (user) => user.splitPayments, {
    nullable: false,
  })
  contributor: Relation<User>;

  /**
   * 支払うべき金額（円）
   */
  @Column({
    type: "int",
  })
  owedAmount: number;

  /**
   * 実際に支払った金額（円）
   */
  @Column({
    type: "int",
  })
  paidAmount: number;

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
  constructor(partial?: Partial<SplitPayment>) {
    Object.assign(this, partial);
  }
}
