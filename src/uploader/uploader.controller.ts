import { ApiResponse, ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Req } from '@nestjs/common';
import { ApiSignature } from '@app/toolkit';
import { BaseResponse } from '@app/shared';
import { UserGuard } from 'src/app.guards';
import { UploaderService } from './uploader.service';
import { MediaResponse } from './uploader.responses';
import { DeleteMediaDto, UploadMediaDto } from './uploader.dto';

@ApiTags('uploader')
@Controller('uploader')
export class UploaderController {
  constructor(private readonly service: UploaderService) {}

  @ApiSignature({
    method: 'POST',
    path: '/',
    summary: `upload file/media`,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 200, type: MediaResponse })
  @UserGuard()
  async upload(@Body() _: UploadMediaDto, @Req() request: any): Promise<MediaResponse> {
    return {
      media: await this.service.upload(request),
    };
  }

  @ApiSignature({
    method: 'DELETE',
    path: '/',
    summary: 'delete media by url',
  })
  @ApiParam({ name: 'url', description: 'media url' })
  @ApiResponse({ status: 200, type: BaseResponse })
  @UserGuard()
  async delete(@Body() dto: DeleteMediaDto) {
    await this.service.delete(dto.url);
  }
}
