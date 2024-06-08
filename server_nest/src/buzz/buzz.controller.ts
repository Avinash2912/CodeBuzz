import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Post,
  Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import createBuzzDto from './dto/create-buzz.dto';

@Controller('buzz')
@ApiTags('buzz')
export class BuzzController {
  @Get('getbuzz/:id')
  @HttpCode(HttpStatus.OK)
  @Version('1')
  getBuzz(@Param('id') id: string) {
    return {
      id,
      name: 'John Doe',
    };
  }
  @Get('/getbuzzes')
  @HttpCode(HttpStatus.OK)
  @Version('1')
  getBuzzes(
    @Query('limit') limit: number,
    @Query('start') start: number,
    @Param('userId') userId: string,
  ) {
    return {
      buzzes: [
        {
          id: '1',
          limit,
          start,
          userId,
          name: 'John Doe',
        },
        {
          id: '2',
          name: 'Jane Doe',
        },
      ],
    };
  }
  @Post('/createbuzz')
  @HttpCode(HttpStatus.CREATED)
  @Version('1')
  createBuzz(@Body() body: createBuzzDto): any {
    return {
      body,
      name: 'John Doe',
    };
  }
}
