import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import createCommentDto from './dto/create-comment.dto';

@Controller('comments')
@ApiTags('comments')
export class CommentController {
  @Post('/createcomment')
  @HttpCode(HttpStatus.CREATED)
  @Version('1')
  createComment(@Body() body: createCommentDto): any {
    return {
      body,
      name: 'John Doe',
    };
  }
  @Get('/getcomments/:modelId/:modelType')
  @HttpCode(HttpStatus.OK)
  @Version('1')
  getComments(
    @Param('modelId') modelId: string,
    @Param('modelType') modelType: string,
    @Query('limit') limit: number,
    @Query('start') start: number,
  ): any {
    return {
      modelId,
      modelType,
      limit,
      start,
      name: 'John Doe',
    };
  }
}
