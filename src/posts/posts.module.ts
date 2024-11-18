import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { LikesService } from './likes.service';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [LikesService, PostsService],
})
export class PostsModule {}
