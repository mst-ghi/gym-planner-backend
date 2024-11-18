import { GenderEnum, UserMaritalStatusEnum } from '@app/shared';
import { IsEmptyOptional } from '@app/toolkit';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @Length(6, 150)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'It can be mobile or email value' })
  email_or_mobile: string;

  @MinLength(8)
  @MaxLength(191)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class RegisterDto {
  @MinLength(1)
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fullname: string;

  @IsDateString()
  @IsEmptyOptional()
  @ApiProperty()
  birth_day: string;

  @Length(11)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  mobile: string;

  @IsEmail()
  @IsEmptyOptional()
  @ApiProperty()
  email: string;

  @MinLength(8)
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsEnum(GenderEnum)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  gender: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  weight: number;

  @IsNumber()
  @ApiProperty()
  @ApiProperty()
  height: number;
}

export class RefreshDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  access_token: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  refresh_token: string;
}

export class ChangePasswordDto {
  @MinLength(8)
  @MaxLength(191)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty({ required: false })
  current_password: string;

  @MinLength(8)
  @MaxLength(191)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  new_password: string;
}

export class AvatarDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  avatar_url: string;
}

export class UpdateInfoDto {
  @MinLength(1)
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fullname: string;

  @IsDateString()
  @IsEmptyOptional()
  @ApiProperty()
  birth_day: string;

  @IsEmail()
  @IsEmptyOptional()
  @ApiProperty()
  email: string;

  @IsEnum(GenderEnum)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  gender: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  weight: number;

  @IsNumber()
  @ApiProperty()
  @ApiProperty()
  height: number;

  @Length(20)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  national_code?: string;

  @Length(20)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  blood_type?: string;

  @IsEnum(UserMaritalStatusEnum)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  marital_status?: UserMaritalStatusEnum;

  @Length(50)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  job?: string;

  @Length(150)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  education?: string;

  @Length(255)
  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  address?: string;
}

export class VerifyValidateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  hash: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code: string;
}

export class OtpRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  mobile: string;
}

export class OtpValidateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  hash: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code: string;

  @IsString()
  @IsEmptyOptional()
  @ApiProperty()
  new_password?: string;
}
