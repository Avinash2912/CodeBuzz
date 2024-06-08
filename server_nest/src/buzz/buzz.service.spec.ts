import { Test, TestingModule } from '@nestjs/testing';
import { BuzzService } from './buzz.service';

describe('BuzzService', () => {
  let service: BuzzService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuzzService],
    }).compile();

    service = module.get<BuzzService>(BuzzService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
