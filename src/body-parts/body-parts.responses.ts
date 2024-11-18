import { BaseResponse, BodyPartModel } from '@app/shared';
import { ApiProperty } from '@nestjs/swagger';

export class BodyPartsResponse extends BaseResponse {
  @ApiProperty({ type: () => [BodyPartModel] })
  body_parts: any;
}

export class BodyPartResponse extends BaseResponse {
  @ApiProperty({ type: () => BodyPartModel })
  body_part: any;
}
