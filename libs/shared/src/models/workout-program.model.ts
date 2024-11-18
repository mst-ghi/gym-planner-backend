import { BaseModel } from './base.model';
import { ApiProperty } from '@nestjs/swagger';
import { WorkoutProgramStatusEnum } from '../enums';
import { UserProfileModel, UserProfileSelect } from './user.model';
import { ExerciseShortModel, ExerciseShortSelect } from './exercise.model';

export class WorkoutProgramItemModel extends BaseModel {
  @ApiProperty()
  program_id: string;

  @ApiProperty()
  exercise_id: string;

  @ApiProperty()
  day: number;

  @ApiProperty()
  priority: number;

  @ApiProperty()
  frequency: number;

  @ApiProperty()
  times: number;

  @ApiProperty()
  is_super: boolean;

  @ApiProperty({ type: () => ExerciseShortModel })
  exercise: ExerciseShortModel;
}

export const WorkoutProgramItemSelect = {
  id: true,
  program_id: true,
  exercise_id: true,
  day: true,
  priority: true,
  frequency: true,
  times: true,
  is_super: true,
  created_at: true,
  updated_at: true,
  exercise: {
    select: ExerciseShortSelect,
  },
};

export class WorkoutProgramModel extends BaseModel {
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

  @ApiProperty()
  voice_url: string;

  @ApiProperty({ enum: WorkoutProgramStatusEnum })
  status: WorkoutProgramStatusEnum;

  @ApiProperty()
  started_at: Date;

  @ApiProperty()
  ended_at: Date;

  @ApiProperty({ type: () => UserProfileModel })
  user: UserProfileModel;

  @ApiProperty({ type: () => [WorkoutProgramItemModel] })
  items: WorkoutProgramItemModel[];
}

export const WorkoutProgramSelect = {
  id: true,
  couch_id: true,
  user_id: true,
  user_plan_id: true,
  title: true,
  description: true,
  voice_url: true,
  status: true,
  started_at: true,
  ended_at: true,
  created_at: true,
  updated_at: true,
  user: {
    select: UserProfileSelect,
  },
  items: {
    select: WorkoutProgramItemSelect,
  },
};
