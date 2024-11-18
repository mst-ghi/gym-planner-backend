import { IsEmptyOptional } from '@app/toolkit';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class MedicalRecordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  user_id: string;

  @Length(1, 100)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  practice_history: string;

  @Length(1, 100)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  taking_sports_supplements: string;

  @Length(1, 100)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  history_of_bone_fracture: string;

  @Length(1, 100)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  food_allergy: string;

  @Length(1, 40)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  wake_up_time: string;

  @Length(1, 40)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  breakfast_time: string;

  @Length(1, 40)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  lunch_time: string;

  @Length(1, 40)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  dinner_time: string;

  @Length(1, 40)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  sleeping_time: string;

  @Length(1, 40)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  practice_time: string;

  @Length(1, 255)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  note: string;

  @Length(1, 350)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  front_media_url: string;

  @Length(1, 350)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  right_media_url: string;

  @Length(1, 350)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  left_media_url: string;

  @Length(1, 350)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  back_media_url: string;

  @Length(1, 350)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  front_arm_media_url: string;

  @Length(1, 350)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  back_arm_media_url: string;
}
