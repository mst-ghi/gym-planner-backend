import { BaseResponse, PaginationMetaResponse, UserModel } from '@app/shared';
import { ApiProperty } from '@nestjs/swagger';

export class UsersResponse extends BaseResponse {
  @ApiProperty({ type: () => [UserModel] })
  users: any;

  @ApiProperty({ type: PaginationMetaResponse })
  meta: any;
}

export class UserResponse extends BaseResponse {
  @ApiProperty({ type: () => UserModel })
  user: any;
}
