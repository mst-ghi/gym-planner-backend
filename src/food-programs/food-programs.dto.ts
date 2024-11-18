import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmptyOptional } from '@app/toolkit';
import { FoodProgramStatusEnum } from '@app/shared';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

export class FoodProgramItemDto {
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  id: string;

  @Length(1, 164)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cause: string;

  @Length(1, 10000)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;
}

export class FoodProgramDto {
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

  @IsEnum(FoodProgramStatusEnum)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: FoodProgramStatusEnum })
  status: FoodProgramStatusEnum;

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
  @Type(() => FoodProgramItemDto)
  @ApiProperty({ type: () => [FoodProgramItemDto] })
  items: FoodProgramItemDto[];
}
