import { GenderEnum } from '../enums';
import { BaseModel } from './base.model';
import { ApiProperty } from '@nestjs/swagger';
import { BodyPartShortModel } from './body-part.model';
import { EquipmentShortModel } from './equipment.model';

export class ExerciseModel extends BaseModel {
  @ApiProperty()
  body_part_id: string;

  @ApiProperty()
  equipment_id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  title_en: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  cover_url: string | null;

  @ApiProperty()
  media_url: string | null;

  @ApiProperty({ enum: GenderEnum })
  gender: GenderEnum | null;

  @ApiProperty({ type: () => BodyPartShortModel })
  bodyPart?: BodyPartShortModel;

  @ApiProperty({ type: () => EquipmentShortModel, required: false })
  equipment?: EquipmentShortModel;
}

export class ExerciseShortModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  body_part_id: string;

  @ApiProperty()
  equipment_id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  title_en: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  cover_url: string | null;

  @ApiProperty()
  media_url: string | null;

  @ApiProperty({ enum: GenderEnum })
  gender: GenderEnum | null;
}

export const ExerciseSelect = {
  id: true,
  body_part_id: true,
  equipment_id: true,
  title: true,
  title_en: true,
  description: true,
  cover_url: true,
  media_url: true,
  gender: true,
  created_at: true,
  updated_at: true,
  bodyPart: {
    select: {
      id: true,
      title: true,
      description: true,
      media_url: true,
    },
  },
  equipment: {
    select: {
      id: true,
      title: true,
      description: true,
      media_url: true,
    },
  },
};

export const ExerciseShortSelect = {
  id: true,
  body_part_id: true,
  equipment_id: true,
  title: true,
  title_en: true,
  description: true,
  cover_url: true,
  media_url: true,
  gender: true,
};
