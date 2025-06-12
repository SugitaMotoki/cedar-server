import { Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { UsersService } from "src/users/users.service";

/**
 * 支払いに関するサービス
 */
@Injectable()
export class PaymentsService {
  /**
   * コンストラクタ
   * @param paymentRepository 支払いのリポジトリ
   * @param usersService ユーザに関するサービス
   */
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly usersService: UsersService,
  ) {}

  /**
   * 支払いを作成する関数
   * @param createPaymentDto
   * @returns 作成した支払い（失敗したらnull）
   */
  async create(
    createPaymentDto: CreatePaymentDto,
  ): Promise<Readonly<Payment | null>> {
    const payer = await this.usersService.findByIdOrNull(
      createPaymentDto.payerId,
    );
    if (payer === null) {
      return null;
    }
    const payment = new Payment({
      name: createPaymentDto.name,
      payer,
      payerAmount: createPaymentDto.payerAmount,
      isSettled: false,
    });
    try {
      await this.paymentRepository.save(payment);
      console.log(`payment ${payment.paymentId}, ${payment.name} added`);
    } catch (error: unknown) {
      console.warn(error);
      return null;
    }
    return payment;
  }

  /**
   * 全ての支払いを返す関数
   * @returns 全ての支払い（失敗したらnull）
   */
  findAll(): Promise<Readonly<Payment[]>> {
    const payments = this.paymentRepository.find({
      order: {
        createdAt: "ASC",
      },
      relations: {
        payer: true,
        splitPayments: {
          contributor: true,
        },
      },
    });
    return payments;
  }

  /**
   * IDに対応する支払いを返す関数
   * @param id ID
   * @returns IDに対応する支払い（見つからなければnull）
   */
  findByIdOrNull(id: number): Promise<Readonly<Payment | null>> {
    const payment = this.paymentRepository.findOne({
      where: {
        paymentId: id,
      },
      relations: {
        payer: true,
        splitPayments: {
          contributor: true,
        },
      },
    });
    return payment;
  }

  /**
   * IDに対応する支払いを更新する関数
   * @param id ID
   * @param updatePaymentDto 更新内容
   * @returns 更新結果
   */
  update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<UpdateResult> {
    const result = this.paymentRepository.update(id, updatePaymentDto);
    return result;
  }

  /**
   * IDに対応する支払いを削除する関数
   * @param id ID
   * @returns 削除結果
   */
  remove(id: number): Promise<DeleteResult> {
    const result = this.paymentRepository.delete(id);
    return result;
  }
}
