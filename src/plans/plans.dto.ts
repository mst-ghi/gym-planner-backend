import { ApiProperty } from '@nestjs/swagger';
import { IsEmptyOptional } from '@app/toolkit';
import { PlanStatusEnum, PlanPeriodTypeEnum } from '@app/shared';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class PlanDto {
  @Max(10000)
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  priority: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @Max(100)
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  discount: number;

  @Length(2, 150)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsEnum(PlanPeriodTypeEnum)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: PlanPeriodTypeEnum })
  period_type: PlanPeriodTypeEnum;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  period_value: number;

  @Length(2, 255)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @Length(2, 255)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty({ required: false })
  cover_url: string;

  @IsEnum(PlanStatusEnum)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: PlanStatusEnum })
  status: PlanStatusEnum;
}

export class PlanPaymentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  plan_id: string;
}
