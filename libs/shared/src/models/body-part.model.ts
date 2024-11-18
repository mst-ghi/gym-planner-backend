import { BaseModel } from './base.model';
import { BodyPartLevel } from '../enums';
import { ApiProperty } from '@nestjs/swagger';
import { ExerciseShortModel, ExerciseShortSelect } from './exercise.model';

export class BodyPartModel extends BaseModel {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  media_url: string | null;

  @ApiProperty({ enum: BodyPartLevel })
  level: string;

  @ApiProperty({ type: () => [ExerciseShortModel], required: false })
  exercises?: ExerciseShortModel[];
}

export class BodyPartShortModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  media_url: string | null;

  @ApiProperty({ enum: BodyPartLevel })
  level: string;
}

export const BodyPartSelect = {
  id: true,
  title: true,
  description: true,
  media_url: true,
  level: true,
  created_at: true,
  updated_at: true,
  exercises: {
    select: ExerciseShortSelect,
  },
};
