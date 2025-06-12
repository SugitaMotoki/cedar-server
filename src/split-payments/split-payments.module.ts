import { Module } from "@nestjs/common";
import { SplitPaymentsService } from "./split-payments.service";
import { SplitPaymentsController } from "./split-payments.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SplitPayment } from "./entities/split-payment.entity";
import { PaymentsModule } from "src/payments/payments.module";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([SplitPayment]),
    PaymentsModule,
    UsersModule,
  ],
  controllers: [SplitPaymentsController],
  providers: [SplitPaymentsService],
})
export class SplitPaymentsModule {}
