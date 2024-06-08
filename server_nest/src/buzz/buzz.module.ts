import { Module } from '@nestjs/common';
import { BuzzController } from './buzz.controller';
import { BuzzService } from './buzz.service';

@Module({
  controllers: [BuzzController],
  providers: [BuzzService],
})
export class BuzzModule {}
