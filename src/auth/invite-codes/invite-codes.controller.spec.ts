import { Test, TestingModule } from '@nestjs/testing';
import { InviteCodesController } from './invite-codes.controller';

describe('InviteCodesController', () => {
  let controller: InviteCodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InviteCodesController],
    }).compile();

    controller = module.get<InviteCodesController>(InviteCodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
