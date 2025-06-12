import { PartialType } from "@nestjs/mapped-types";
import { CreateSplitPaymentDto } from "./create-split-payment.dto";

export class UpdateSplitPaymentDto extends PartialType(CreateSplitPaymentDto) {}
