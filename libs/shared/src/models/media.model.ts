import { ApiProperty } from '@nestjs/swagger';

export class MediaModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  mimetype: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  size: string;
}

export const MediaSelect = {
  id: true,
  mimetype: true,
  url: true,
  size: true,
};
