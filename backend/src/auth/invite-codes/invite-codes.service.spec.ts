import { Test, TestingModule } from '@nestjs/testing';
import { InviteCodesService } from './invite-codes.service';

describe('InviteCodesService', () => {
  let service: InviteCodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InviteCodesService],
    }).compile();

    service = module.get<InviteCodesService>(InviteCodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
