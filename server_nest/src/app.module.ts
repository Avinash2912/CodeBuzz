import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BuzzModule } from './buzz/buzz.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { DatabaseModule } from './config/db/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    BuzzModule,
    CommentModule,
    LikeModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
