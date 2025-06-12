/**
 * 割り勘を作成する際のDTO
 */
export class CreateSplitPaymentDto {
  /**
   * 割り勘した支払いのID
   */
  paymentId: number;

  /**
   * 割り勘した相手のID
   */
  contributorId: number;

  /**
   * 支払うべき金額（円）
   */
  owedAmount: number;

  /**
   * 実際に支払った金額（円）
   */
  paidAmount: number;
}
