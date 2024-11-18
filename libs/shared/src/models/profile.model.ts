import { BaseModel } from './base.model';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum, UserMaritalStatusEnum } from '../enums';

export class ProfileModel extends BaseModel {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  avatar_url: string | null;

  @ApiProperty({ enum: GenderEnum })
  gender: GenderEnum;

  @ApiProperty()
  blood_type: string | null;

  @ApiProperty({ enum: UserMaritalStatusEnum })
  marital_status: UserMaritalStatusEnum;

  @ApiProperty()
  job: string | null;

  @ApiProperty()
  education: string | null;

  @ApiProperty()
  address: string | null;

  @ApiProperty()
  weight: number | null;

  @ApiProperty()
  height: number | null;

  @ApiProperty()
  birth_day?: Date;
}

export class ProfileShortModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  avatar_url: string | null;

  @ApiProperty({ enum: GenderEnum })
  gender: GenderEnum;
}

export const ProfileSelect = {
  id: true,
  user_id: true,
  avatar_url: true,
  gender: true,
  blood_type: true,
  marital_status: true,
  job: true,
  education: true,
  address: true,
  weight: true,
  height: true,
  birth_day: true,
  created_at: true,
  updated_at: true,
};

export const ProfileShortSelect = {
  id: true,
  user_id: true,
  avatar_url: true,
  gender: true,
};
