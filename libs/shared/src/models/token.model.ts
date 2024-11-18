import { BaseModel } from './base.model';
import { ApiProperty } from '@nestjs/swagger';

export class TokenModel extends BaseModel {
  @ApiProperty()
  user_id: string | null;

  @ApiProperty()
  id_number: string;

  @ApiProperty()
  refresh_token: string;

  @ApiProperty()
  access_token: string;

  @ApiProperty()
  invoked: boolean;

  @ApiProperty()
  expires_at: Date;

  @ApiProperty()
  refresh_expires_at: Date;
}
