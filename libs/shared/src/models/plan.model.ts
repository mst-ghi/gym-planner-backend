import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from './base.model';
import { PlanPeriodTypeEnum, PlanStatusEnum } from '../enums';

export class PlanModel extends BaseModel {
  @ApiProperty()
  priority: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  discount: number;

  @ApiProperty({ enum: PlanPeriodTypeEnum })
  period_type: string;

  @ApiProperty()
  period_value: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  cover_url: string;

  @ApiProperty({ enum: PlanStatusEnum })
  status: string;
}

export const PlanSelect = {
  id: true,
  priority: true,
  title: true,
  price: true,
  discount: true,
  period_type: true,
  period_value: true,
  description: true,
  cover_url: true,
  status: true,
  created_at: true,
  updated_at: true,
};
