import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmptyOptional } from '@app/toolkit';
import { WorkoutProgramStatusEnum } from '@app/shared';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

export class WorkoutProgramItemDto {
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  exercise_id: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  day: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  priority: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  frequency: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  times: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  is_super: boolean;
}

export class WorkoutProgramDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  user_id: string;

  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  user_plan_id: string;

  @Length(1, 200)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @Length(1, 350)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @Length(1, 350)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  voice_url: string;

  @IsEnum(WorkoutProgramStatusEnum)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: WorkoutProgramStatusEnum })
  status: WorkoutProgramStatusEnum;

  @IsDateString()
  @IsEmptyOptional()
  @ApiProperty()
  started_at?: string;

  @IsDateString()
  @IsEmptyOptional()
  @ApiProperty()
  ended_at?: string;

  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => WorkoutProgramItemDto)
  @ApiProperty({ type: () => [WorkoutProgramItemDto] })
  items: WorkoutProgramItemDto[];
}
