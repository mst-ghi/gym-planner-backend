import { PostStatusEnum } from '@app/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cover_url: string;

  @Length(1, 255)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @Length(1, 300)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'separate tags with `| pipe` char' })
  tags: string;

  @IsEnum(PostStatusEnum)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: PostStatusEnum })
  status: PostStatusEnum;
}
