import { Test, TestingModule } from "@nestjs/testing";
import { SplitPaymentsController } from "./split-payments.controller";
import { SplitPaymentsService } from "./split-payments.service";

describe("SplitPaymentsController", () => {
  let controller: SplitPaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SplitPaymentsController],
      providers: [SplitPaymentsService],
    }).compile();

    controller = module.get<SplitPaymentsController>(SplitPaymentsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
