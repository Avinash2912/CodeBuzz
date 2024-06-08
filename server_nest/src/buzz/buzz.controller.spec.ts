import { Test, TestingModule } from '@nestjs/testing';
import { BuzzController } from './buzz.controller';

describe('BuzzController', () => {
  let controller: BuzzController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuzzController],
    }).compile();

    controller = module.get<BuzzController>(BuzzController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
