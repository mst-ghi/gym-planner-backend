import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse, PaginationMetaResponse, UserPlanFullModel, UserPlanModel } from '@app/shared';

export class AllUserPlansResponse extends BaseResponse {
  @ApiProperty({ type: () => [UserPlanFullModel] })
  user_plans: any;

  @ApiProperty({ type: PaginationMetaResponse })
  meta: any;
}

export class AllUserPlanResponse extends BaseResponse {
  @ApiProperty({ type: () => UserPlanFullModel })
  user_plan: any;
}

export class UserPlansResponse extends BaseResponse {
  @ApiProperty({ type: () => [UserPlanModel] })
  user_plans: any;
}

export class UserActivePlanResponse extends BaseResponse {
  @ApiProperty({ type: () => UserPlanModel })
  user_plan: any;
}
