import { BaseModel } from './base.model';
import { ApiProperty } from '@nestjs/swagger';
import { FoodProgramStatusEnum } from '../enums';
import { UserProfileModel, UserProfileSelect } from './user.model';

export class FoodProgramItemModel extends BaseModel {
  @ApiProperty()
  program_id: string;

  @ApiProperty()
  cause: string;

  @ApiProperty()
  content: string;
}

export const FoodProgramItemSelect = {
  id: true,
  program_id: true,
  cause: true,
  content: true,
  created_at: true,
  updated_at: true,
};

export class FoodProgramModel extends BaseModel {
  @ApiProperty()
  couch_id: string;

  @ApiProperty()
  user_id: string | null;

  @ApiProperty()
  user_plan_id: string | null;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: FoodProgramStatusEnum })
  status: FoodProgramStatusEnum;

  @ApiProperty()
  started_at: Date;

  @ApiProperty()
  ended_at: Date;

  @ApiProperty({ type: () => UserProfileModel })
  user: UserProfileModel;

  @ApiProperty({ type: () => [FoodProgramItemModel] })
  items: FoodProgramItemModel[];
}

export const FoodProgramSelect = {
  id: true,
  couch_id: true,
  user_id: true,
  user_plan_id: true,
  title: true,
  description: true,
  status: true,
  started_at: true,
  ended_at: true,
  created_at: true,
  updated_at: true,
  user: {
    select: UserProfileSelect,
  },
  items: {
    select: FoodProgramItemSelect,
  },
};
