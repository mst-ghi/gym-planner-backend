import { BaseResponse, UserModel } from '@app/shared';
import { ApiProperty } from '@nestjs/swagger';

export class TokenResponse {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;

  @ApiProperty()
  expires_at: string;
}

export class LoginResponse extends BaseResponse {
  @ApiProperty({ type: TokenResponse })
  tokens: TokenResponse;
}

export class RegisterResponse extends BaseResponse {
  @ApiProperty({ type: TokenResponse })
  tokens: TokenResponse;
}

export class UserResponse extends BaseResponse {
  @ApiProperty({ type: UserModel })
  user: IUser;
}

export class VerifyResponse {
  @ApiProperty()
  hash: string;

  @ApiProperty()
  expires_at: string;
}

export class VerifyRequestResponse extends BaseResponse {
  @ApiProperty({ type: VerifyResponse })
  verify: VerifyResponse;
}

export class OtpRequestResponse extends BaseResponse {
  @ApiProperty({ type: VerifyResponse })
  otp: VerifyResponse;
}

export class OtpValidateResponse extends BaseResponse {
  @ApiProperty({ type: TokenResponse })
  tokens: TokenResponse;
}
