import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadMediaDto {
  @ApiProperty({ format: 'binary' })
  file: any;
}

export class DeleteMediaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  url: string;
}
