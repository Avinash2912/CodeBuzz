import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('likes')
@ApiTags('likes')
export class LikeController {
  @Post('/toggle')
  @HttpCode(HttpStatus.CREATED)
  @Version('1')
  toggleLike(
    @Query('modelId') modelId: string,
    @Query('modelType') modelType: string,
  ): any {
    return {
      modelId,
      modelType,
      name: 'John Doe',
    };
  }
}
