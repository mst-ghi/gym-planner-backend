import { BaseModel } from './base.model';
import { ApiProperty } from '@nestjs/swagger';

export class MedicalRecordModel extends BaseModel {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  practice_history: string | null;

  @ApiProperty()
  taking_sports_supplements: string | null;

  @ApiProperty()
  history_of_bone_fracture: string | null;

  @ApiProperty()
  food_allergy: string | null;

  @ApiProperty()
  wake_up_time: string | null;

  @ApiProperty()
  breakfast_time: string | null;

  @ApiProperty()
  lunch_time: string | null;

  @ApiProperty()
  dinner_time: string | null;

  @ApiProperty()
  sleeping_time: string | null;

  @ApiProperty()
  practice_time: string | null;

  @ApiProperty()
  note: string | null;

  @ApiProperty()
  front_media_url: string | null;

  @ApiProperty()
  right_media_url: string | null;

  @ApiProperty()
  left_media_url: string | null;

  @ApiProperty()
  back_media_url: string | null;

  @ApiProperty()
  front_arm_media_url: string | null;

  @ApiProperty()
  back_arm_media_url: string | null;
}

export const MedicalRecordSelect = {
  id: true,
  user_id: true,
  practice_history: true,
  taking_sports_supplements: true,
  history_of_bone_fracture: true,
  food_allergy: true,
  wake_up_time: true,
  breakfast_time: true,
  lunch_time: true,
  dinner_time: true,
  sleeping_time: true,
  practice_time: true,
  note: true,
  front_media_url: true,
  right_media_url: true,
  left_media_url: true,
  back_media_url: true,
  front_arm_media_url: true,
  back_arm_media_url: true,
  created_at: true,
  updated_at: true,
};
