import { PartialType } from "@nestjs/mapped-types";
import { CreatePaymentDto } from "./create-payment.dto";

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  /**
   * 精算済みかどうか
   */
  isSettled: boolean;
}
