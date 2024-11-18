import { BaseResponse, PaymentModel, PlanModel, UserPlanShortModel } from '@app/shared';
import { ApiProperty } from '@nestjs/swagger';

export class PlansResponse extends BaseResponse {
  @ApiProperty({ type: () => [PlanModel] })
  plans: any[];
}

export class PlanResponse extends BaseResponse {
  @ApiProperty({ type: () => PlanModel })
  plan: any;
}

export class PlanCreatePaymentResponse extends BaseResponse {
  @ApiProperty({ type: () => PaymentModel })
  payment: any;

  @ApiProperty({ type: () => UserPlanShortModel, required: false })
  user_plan?: any;
}
