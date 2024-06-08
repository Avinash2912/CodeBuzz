import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  @Get(':username')
  @HttpCode(HttpStatus.OK)
  @Version('1')
  getUser(@Param('username') username: string): any {
    return {
      username,
      name: 'John Doe',
    };
  }

  @Post('/followtoggle')
  @HttpCode(HttpStatus.CREATED)
  @Version('1')
  followToggle(@Body() body: any): any {
    return {
      body,
      name: 'John Doe',
    };
  }
}
