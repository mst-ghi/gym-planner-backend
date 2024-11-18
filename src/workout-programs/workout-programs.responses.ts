import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse, PaginationMetaResponse, WorkoutProgramModel } from '@app/shared';

export class WorkoutProgramsResponse extends BaseResponse {
  @ApiProperty({ type: () => [WorkoutProgramModel] })
  workout_programs: any;

  @ApiProperty({ type: PaginationMetaResponse })
  meta: any;
}

export class WorkoutProgramsUserResponse extends BaseResponse {
  @ApiProperty({ type: () => [WorkoutProgramModel] })
  workout_programs: any;
}

export class WorkoutProgramResponse extends BaseResponse {
  @ApiProperty({ type: () => WorkoutProgramModel })
  workout_program: any;
}
