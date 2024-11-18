import { GenderEnum } from '@app/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmptyOptional } from '@app/toolkit';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  body_part_id: string;

  @IsString()
  @IsEmptyOptional()
  @ApiProperty({ required: false })
  equipment_id: string;

  @Length(1, 200)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @Length(1, 200)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title_en: string;

  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  description: string;

  @Length(1, 350)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  cover_url: string;

  @Length(1, 350)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  media_url: string;

  @IsEnum(GenderEnum)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  gender: string;
}

export class UpdateExerciseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  body_part_id: string;

  @IsString()
  @IsEmptyOptional()
  @ApiProperty({ required: false })
  equipment_id: string;

  @Length(1, 200)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @Length(1, 200)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title_en: string;

  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  description: string;

  @Length(1, 350)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  cover_url: string;

  @Length(1, 350)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  media_url: string;

  @IsEnum(GenderEnum)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  gender: string;
}
