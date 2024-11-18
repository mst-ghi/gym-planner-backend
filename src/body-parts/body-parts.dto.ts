import { BodyPartLevel } from '@app/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmptyOptional } from '@app/toolkit';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class BodyPartDto {
  @Length(1, 100)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

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

  @IsEnum(BodyPartLevel)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  level: string;
}
