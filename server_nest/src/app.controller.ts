import { Controller, Get, HttpCode, HttpStatus, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get('/home')
  @HttpCode(HttpStatus.OK)
  @Version('1')
  getHello(): string {
    return this.appService.getHello();
  }
}
