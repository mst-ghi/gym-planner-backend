import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from './base.model';
import { PaymentStatusEnum } from '../enums';

export class PaymentModel extends BaseModel {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  plan_id: string;

  @ApiProperty()
  total_price: number;

  @ApiProperty()
  discount_price: number;

  @ApiProperty({ enum: PaymentStatusEnum })
  status: PaymentStatusEnum;
}

export const PaymentSelect = {
  id: true,
  user_id: true,
  plan_id: true,
  total_price: true,
  discount_price: true,
  status: true,
  created_at: true,
  updated_at: true,
};
