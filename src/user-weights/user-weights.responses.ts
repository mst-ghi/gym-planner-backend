import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse, UserWeightModel } from '@app/shared';

export class UserWeightsResponse extends BaseResponse {
  @ApiProperty({ type: () => [UserWeightModel] })
  weights: any;
}

export class UserWeightResponse extends BaseResponse {
  @ApiProperty({ type: () => UserWeightModel })
  weight: any;
}
