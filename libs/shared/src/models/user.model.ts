import { BaseModel } from './base.model';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UserKindEnum, UserStatusEnum } from '../enums';
import { TeamModel } from './team.model';
import { ProfileModel, ProfileSelect, ProfileShortModel, ProfileShortSelect } from './profile.model';

export class UserFullModel extends BaseModel {
  @ApiProperty()
  mobile: string;

  @ApiProperty()
  email: string | null;

  @ApiProperty()
  fullname: string | null;

  @Exclude()
  password?: string | null;

  @ApiProperty()
  verify_email: boolean;

  @ApiProperty({ enum: UserKindEnum })
  kind: UserKindEnum;

  @ApiProperty({ enum: UserStatusEnum })
  status: UserStatusEnum;

  @ApiProperty({ type: () => ProfileModel, required: false })
  profile?: ProfileModel;

  @ApiProperty({ type: () => [TeamModel], required: false })
  teams?: TeamModel[];
}

export class UserModel extends BaseModel {
  @ApiProperty()
  mobile: string;

  @ApiProperty()
  email: string | null;

  @ApiProperty()
  national_code: string | null;

  @ApiProperty()
  fullname: string | null;

  @Exclude()
  password?: string | null;

  @ApiProperty()
  verify_email: boolean;

  @ApiProperty({ enum: UserKindEnum })
  kind: UserKindEnum;

  @ApiProperty({ enum: UserStatusEnum })
  status: UserStatusEnum;

  @ApiProperty({ type: () => ProfileModel, required: false })
  profile?: ProfileModel;
}

export class ShortUserModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  email: string | null;

  @ApiProperty()
  fullname: string | null;

  @ApiProperty({ enum: UserKindEnum })
  kind: UserKindEnum;

  @ApiProperty({ enum: UserStatusEnum })
  status: UserStatusEnum;
}

export class UserProfileModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  email: string | null;

  @ApiProperty()
  fullname: string | null;

  @ApiProperty({ enum: UserKindEnum })
  kind: UserKindEnum;

  @ApiProperty({ type: () => ProfileShortModel })
  profile: ProfileShortModel;
}

export const UserSelect = {
  id: true,
  mobile: true,
  email: true,
  fullname: true,
  verify_email: true,
  kind: true,
  status: true,
  created_at: true,
  updated_at: true,
  profile: {
    select: ProfileSelect,
  },
};

export const ShortUserSelect = {
  id: true,
  mobile: true,
  email: true,
  fullname: true,
  kind: true,
  status: true,
};

export const UserProfileSelect = {
  id: true,
  mobile: true,
  email: true,
  fullname: true,
  kind: true,
  profile: {
    select: ProfileShortSelect,
  },
};
