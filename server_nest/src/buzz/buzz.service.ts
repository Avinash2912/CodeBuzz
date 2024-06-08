import { Injectable } from '@nestjs/common';

@Injectable()
export class BuzzService {
  create(data: any) {
    return 'This action adds a new buzz';
  }
}
