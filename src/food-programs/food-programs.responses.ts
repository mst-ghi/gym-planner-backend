import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse, PaginationMetaResponse, FoodProgramModel } from '@app/shared';

export class FoodProgramsResponse extends BaseResponse {
  @ApiProperty({ type: () => [FoodProgramModel] })
  food_programs: any;

  @ApiProperty({ type: PaginationMetaResponse })
  meta: any;
}

export class FoodProgramsUserResponse extends BaseResponse {
  @ApiProperty({ type: () => [FoodProgramModel] })
  food_programs: any;
}

export class FoodProgramResponse extends BaseResponse {
  @ApiProperty({ type: () => FoodProgramModel })
  food_program: any;
}
