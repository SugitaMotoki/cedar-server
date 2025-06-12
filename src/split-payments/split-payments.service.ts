import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SplitPayment } from "./entities/split-payment.entity";
import { Repository } from "typeorm";
import { PaymentsService } from "src/payments/payments.service";
import { UsersService } from "src/users/users.service";
import { CreateSplitPaymentDto } from "./dto/create-split-payment.dto";

/**
 * 割り勘に関するサービス
 */
@Injectable()
export class SplitPaymentsService {
  /**
   * コンストラクタ
   * @param splitPaymentRepository 割り勘のリポジトリ
   * @param usersService ユーザに関するサービス
   * @param paymentsService 支払いに関するサービス
   */
  constructor(
    @InjectRepository(SplitPayment)
    private readonly splitPaymentRepository: Repository<SplitPayment>,
    private readonly usersService: UsersService,
    private readonly paymentsService: PaymentsService,
  ) {}

  /**
   * 割り勘を作成する関数
   * @param createSplitPaymentDto
   * @returns 作成した割り勘（失敗したらnull）
   */
  async create(
    createSplitPaymentDto: CreateSplitPaymentDto,
  ): Promise<Readonly<SplitPayment | null>> {
    const payment = await this.paymentsService.findByIdOrNull(
      createSplitPaymentDto.paymentId,
    );
    if (payment == null) {
      return null;
    }
    const contributor = await this.usersService.findByIdOrNull(
      createSplitPaymentDto.contributorId,
    );
    if (contributor === null) {
      return null;
    }
    const splitPayment = new SplitPayment({
      payment,
      contributor,
      owedAmount: createSplitPaymentDto.owedAmount,
      paidAmount: createSplitPaymentDto.paidAmount,
    });
    try {
      await this.splitPaymentRepository.save(splitPayment);
      console.log(
        `splitPayment ${splitPayment.splitPaymentId}, ${payment.paymentId}, ${contributor.userId}`,
      );
    } catch (error: unknown) {
      console.warn(error);
      return null;
    }
    return splitPayment;
  }
}
