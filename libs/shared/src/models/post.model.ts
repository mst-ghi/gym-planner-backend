import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from './base.model';
import { PostStatusEnum } from '../enums/index';
import { ShortUserModel, ShortUserSelect, UserProfileModel, UserProfileSelect } from './user.model';

export class PostModel extends BaseModel {
  @ApiProperty()
  owner_id: string | null;

  @ApiProperty()
  cover_url: string | null;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  tags: string;

  @ApiProperty({ enum: PostStatusEnum })
  status: PostStatusEnum;

  @ApiProperty({ type: () => ShortUserModel })
  owner: ShortUserModel;

  @ApiProperty({ type: () => [LikeShortModel], required: false })
  likes: LikeShortModel[];
}

export class LikeShortModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  post_id: string;

  @ApiProperty()
  user_id: string;
}

export class LikeModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  post_id: string;

  @ApiProperty()
  user_id: string;

  @ApiProperty({ type: () => UserProfileModel })
  user: UserProfileModel;
}

export const PostSelect = {
  id: true,
  owner_id: true,
  cover_url: true,
  title: true,
  content: true,
  tags: true,
  status: true,
  created_at: true,
  updated_at: true,
  owner: {
    select: ShortUserSelect,
  },
  likes: {
    select: {
      id: true,
      post_id: true,
      user_id: true,
    },
  },
};

export const LikeSelect = {
  id: true,
  post_id: true,
  user_id: true,
  user: {
    select: UserProfileSelect,
  },
};
