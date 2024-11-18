import { BaseModel } from './base.model';
import { ApiProperty } from '@nestjs/swagger';
import { ExerciseShortModel, ExerciseShortSelect } from './exercise.model';

export class EquipmentModel extends BaseModel {
  @ApiProperty()
  title: string;

  @ApiProperty()
  title_en: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  media_url: string | null;

  @ApiProperty({ type: () => [ExerciseShortModel], required: false })
  exercises?: ExerciseShortModel[];
}

export class EquipmentShortModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  title_en: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  media_url: string | null;
}

export const EquipmentSelect = {
  id: true,
  title: true,
  title_en: true,
  description: true,
  media_url: true,
  created_at: true,
  updated_at: true,
  exercises: {
    select: ExerciseShortSelect,
  },
};
