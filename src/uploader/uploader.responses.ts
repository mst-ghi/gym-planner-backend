import { BaseResponse, MediaModel } from '@app/shared';
import { ApiProperty } from '@nestjs/swagger';

export class MediaResponse extends BaseResponse {
  @ApiProperty({ type: () => MediaModel })
  media: any;
}
