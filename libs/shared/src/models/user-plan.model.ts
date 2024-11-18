import { BaseModel } from './base.model';
import { UserPlanStatusEnum } from '../enums';
import { ApiProperty } from '@nestjs/swagger';
import { PlanModel, PlanSelect } from './plan.model';
import { UserModel, UserSelect } from './user.model';
import { PaymentModel, PaymentSelect } from './payment.model';

export class UserPlanFullModel extends BaseModel {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  plan_id: string;

  @ApiProperty()
  payment_id: string;

  @ApiProperty()
  plan_snapshot: object;

  @ApiProperty({ enum: UserPlanStatusEnum })
  status: UserPlanStatusEnum;

  @ApiProperty()
  reservation_at: Date;

  @ApiProperty()
  expires_at: Date;

  @ApiProperty({ type: () => PlanModel, required: false })
  plan?: PlanModel;

  @ApiProperty({ type: () => PaymentModel, required: false })
  payment?: PaymentModel;

  @ApiProperty({ type: () => UserModel, required: false })
  user?: UserModel;
}

export const UserPlanFullSelect = {
  id: true,
  user_id: true,
  plan_id: true,
  payment_id: true,
  plan_snapshot: true,
  status: true,
  reservation_at: true,
  expires_at: true,
  created_at: true,
  updated_at: true,
  plan: { select: PlanSelect },
  payment: { select: PaymentSelect },
  user: { select: UserSelect },
};

export class UserPlanModel extends BaseModel {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  plan_id: string;

  @ApiProperty()
  payment_id: string;

  @ApiProperty()
  plan_snapshot: object;

  @ApiProperty({ enum: UserPlanStatusEnum })
  status: UserPlanStatusEnum;

  @ApiProperty()
  reservation_at: Date;

  @ApiProperty()
  expires_at: Date;

  @ApiProperty({ type: () => PlanModel, required: false })
  plan?: PlanModel;

  @ApiProperty({ type: () => PaymentModel, required: false })
  payment?: PaymentModel;
}

export const UserPlanSelect = {
  id: true,
  user_id: true,
  plan_id: true,
  payment_id: true,
  plan_snapshot: true,
  status: true,
  reservation_at: true,
  expires_at: true,
  created_at: true,
  updated_at: true,
  plan: { select: PlanSelect },
  payment: { select: PaymentSelect },
};

export class UserPlanShortModel extends BaseModel {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  plan_id: string;

  @ApiProperty()
  payment_id: string;

  @ApiProperty()
  plan_snapshot: object;

  @ApiProperty({ enum: UserPlanStatusEnum })
  status: UserPlanStatusEnum;

  @ApiProperty()
  reservation_at: Date;

  @ApiProperty()
  expires_at: Date;
}

export const UserPlanShortSelect = {
  id: true,
  user_id: true,
  plan_id: true,
  payment_id: true,
  plan_snapshot: true,
  status: true,
  reservation_at: true,
  expires_at: true,
  created_at: true,
  updated_at: true,
};
