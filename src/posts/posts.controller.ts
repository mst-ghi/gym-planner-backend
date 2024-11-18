import { Body, Controller, Param, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { LikesService } from './likes.service';
import { ApiSignature } from '@app/toolkit';
import { LikeResponse, PostResponse, PostsResponse } from './posts.responses';
import { Coach, User, UserGuard } from 'src/app.guards';
import { PostDto } from './posts.dto';
import { BaseResponse } from '@app/shared';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly service: PostsService,
    private readonly likesService: LikesService,
  ) {}

  @ApiSignature({
    method: 'GET',
    path: '/',
    summary: 'get list of posts',
    isPagination: true,
  })
  @ApiQuery({ name: 'search', description: 'title and tags', required: false })
  @ApiQuery({ name: 'recent', description: 'any value to get recently list [max 6 posts]', required: false })
  @ApiQuery({
    name: 'none',
    description: 'any value to get all posts without checking status',
    required: false,
  })
  @ApiResponse({ status: 200, type: PostsResponse })
  async list(
    @Query('page') page: string,
    @Query('take') take: string,
    @Query('search') search: string,
    @Query('recent') recent: string,
    @Query('none') none: string,
  ): Promise<PostsResponse> {
    const { data, meta } = await this.service.list({ page, take, none, search, recent });
    return {
      posts: data,
      meta,
    };
  }

  @ApiSignature({
    method: 'GET',
    path: '/:id',
    summary: 'get post info',
  })
  @ApiParam({ name: 'id', description: 'post id' })
  @ApiResponse({ status: 200, type: PostResponse })
  async show(@Param('id') postId: string): Promise<PostResponse> {
    return {
      post: await this.service.show(postId),
    };
  }

  @ApiSignature({
    method: 'POST',
    path: '/',
    summary: 'create new post',
  })
  @ApiResponse({ status: 200, type: PostResponse })
  @UserGuard()
  async create(@Body() dto: PostDto, @Coach('dashboard') _: IUser): Promise<PostResponse> {
    return {
      post: await this.service.create(dto),
    };
  }

  @ApiSignature({
    method: 'PUT',
    path: '/:id',
    summary: 'update post',
  })
  @ApiParam({ name: 'id', description: 'post id' })
  @ApiResponse({ status: 200, type: BaseResponse })
  @UserGuard()
  async update(@Body() dto: PostDto, @Param('id') postId: string, @Coach('dashboard') _: IUser) {
    await this.service.update(postId, dto);
  }

  @ApiSignature({
    method: 'POST',
    path: '/:id/like',
    summary: 'like a post',
  })
  @ApiParam({ name: 'id', description: 'post id' })
  @ApiResponse({ status: 200, type: LikeResponse })
  @UserGuard()
  async like(@Param('id') postId: string, @User() user: IUser): Promise<LikeResponse> {
    return {
      like: await this.likesService.like(user.id, postId),
    };
  }

  @ApiSignature({
    method: 'POST',
    path: '/:id/dislike',
    summary: 'dislike a post',
  })
  @ApiParam({ name: 'id', description: 'post id' })
  @ApiResponse({ status: 200, type: BaseResponse })
  @UserGuard()
  async dislike(@Param('id') postId: string, @User() user: IUser) {
    await this.likesService.dislike(user.id, postId);
  }
}
