import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '@app/shared';

export class DashboardCardsResponse {
  @ApiProperty()
  users_count: number;

  @ApiProperty()
  posts_count: number;

  @ApiProperty()
  equipments_count: number;

  @ApiProperty()
  body_parts_count: number;

  @ApiProperty()
  exercises_count: number;

  @ApiProperty()
  workout_programs_count: number;

  @ApiProperty()
  user_plans_count: number;

  @ApiProperty()
  ready_user_plans_count: number;
}

export class DashboardCardsReportResponse extends BaseResponse {
  @ApiProperty({ type: () => DashboardCardsResponse })
  reports: DashboardCardsResponse;
}
