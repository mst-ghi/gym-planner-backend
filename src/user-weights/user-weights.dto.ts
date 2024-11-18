import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class UserWeightDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  weight: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  date: string;
}
