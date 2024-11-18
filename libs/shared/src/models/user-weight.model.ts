import { ApiProperty } from '@nestjs/swagger';

export class UserWeightModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  created_at?: Date;
}

export const UserWeightSelect = {
  id: true,
  weight: true,
  date: true,
  created_at: true,
};
