import { ApiProperty } from '@nestjs/swagger';
import { IsEmptyOptional } from '@app/toolkit';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class EquipmentDto {
  @Length(1, 100)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @Length(1, 100)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title_en: string;

  @Length(1, 255)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  description: string;

  @Length(1, 350)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  media_url: string;
}
