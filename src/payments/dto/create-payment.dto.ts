/**
 * 支払いを作成する際のDTO
 */
export class CreatePaymentDto {
  /**
   * 名前
   */
  name: string;

  /**
   * 支払ったユーザのID
   */
  payerId: number;

  /**
   * 支払ったユーザが負担すべき金額
   */
  payerCost: number;
}
