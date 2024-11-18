import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse, LikeModel, LikeShortModel, PaginationMetaResponse, PostModel } from '@app/shared';

export class PostsResponse extends BaseResponse {
  @ApiProperty({ type: () => [PostModel] })
  posts: any;

  @ApiProperty({ type: PaginationMetaResponse })
  meta: any;
}

export class PostResponse extends BaseResponse {
  @ApiProperty({ type: () => PostModel })
  post: any;
}

export class UsersLikeResponse extends BaseResponse {
  @ApiProperty({ type: () => [LikeModel] })
  likes: any;
}

export class LikeResponse extends BaseResponse {
  @ApiProperty({ type: () => LikeShortModel })
  like: any;
}
