import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse, ExerciseModel, PaginationMetaResponse } from '@app/shared';

export class ExercisesResponse extends BaseResponse {
  @ApiProperty({ type: () => [ExerciseModel] })
  exercises: any;

  @ApiProperty({ type: PaginationMetaResponse })
  meta: any;
}

export class ExerciseResponse extends BaseResponse {
  @ApiProperty({ type: () => ExerciseModel })
  exercise: any;
}
