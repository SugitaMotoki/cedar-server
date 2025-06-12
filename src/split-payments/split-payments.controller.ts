import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SplitPaymentsService } from "./split-payments.service";
import { CreateSplitPaymentDto } from "./dto/create-split-payment.dto";
import { UpdateSplitPaymentDto } from "./dto/update-split-payment.dto";

@Controller("split-payments")
export class SplitPaymentsController {
  constructor(private readonly splitPaymentsService: SplitPaymentsService) {}

  @Post()
  create(@Body() createSplitPaymentDto: CreateSplitPaymentDto) {
    return this.splitPaymentsService.create(createSplitPaymentDto);
  }

  // @Get()
  // findAll() {
  //   return this.splitPaymentsService.findAll();
  // }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.splitPaymentsService.findOne(+id);
  // }

  // @Patch(":id")
  // update(
  //   @Param("id") id: string,
  //   @Body() updateSplitPaymentDto: UpdateSplitPaymentDto,
  // ) {
  //   return this.splitPaymentsService.update(+id, updateSplitPaymentDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.splitPaymentsService.remove(+id);
  // }
}
