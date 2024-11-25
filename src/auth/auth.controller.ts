import { BaseResponse } from '@app/shared';
import { ApiSignature } from '@app/toolkit';
import { AuthService } from './services';
import { Body, Controller, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User, UserAccessToken, UserGuard } from 'src/app.guards';
import { LoginResponse, RegisterResponse, UserResponse } from './auth.responses';
import { LoginDto, RefreshDto, ChangePasswordDto, RegisterDto, AvatarDto, UpdateInfoDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiSignature({
    method: 'GET',
    path: '/user',
    summary: 'get logged in user info',
  })
  @ApiResponse({ status: 200, type: UserResponse })
  @UserGuard()
  async user(@User() user: IUser): Promise<UserResponse> {
    return {
      user,
    };
  }

  @ApiSignature({
    method: 'PUT',
    path: '/user',
    summary: 'update logged in user info',
  })
  @ApiResponse({ status: 200, type: BaseResponse })
  @UserGuard()
  async updateUserInfo(@Body() dto: UpdateInfoDto, @User() user: IUser) {
    await this.service.updateUserInfo(dto, user);
  }

  @ApiSignature({
    method: 'POST',
    path: '/login',
    summary: 'login api for user',
  })
  @ApiResponse({ status: 200, type: LoginResponse })
  async login(@Body() dto: LoginDto): Promise<LoginResponse> {
    return {
      tokens: await this.service.login(dto),
    };
  }

  @ApiSignature({
    method: 'POST',
    path: '/register',
    summary: 'register api for user',
  })
  @ApiResponse({ status: 200, type: RegisterResponse })
  async register(@Body() dto: RegisterDto): Promise<RegisterResponse> {
    return {
      tokens: await this.service.register(dto),
    };
  }

  @ApiSignature({
    method: 'POST',
    path: '/refresh',
    summary: 'get new tokens by refresh token for user',
  })
  @ApiResponse({ status: 200, type: LoginResponse })
  async userRefreshToken(@Body() dto: RefreshDto): Promise<LoginResponse> {
    return {
      tokens: await this.service.refreshToken(dto),
    };
  }

  @ApiSignature({
    method: 'POST',
    path: '/change-password',
    summary: 'change user password',
  })
  @ApiResponse({ status: 200, type: BaseResponse })
  @UserGuard()
  async userChangePassword(@Body() dto: ChangePasswordDto, @User() user: IUser) {
    await this.service.changePassword(user.id, dto);
  }

  @ApiSignature({
    method: 'POST',
    path: '/change-avatar',
    summary: 'change user avatar',
  })
  @ApiResponse({ status: 200, type: BaseResponse })
  @UserGuard()
  async userChangeAvatar(@Body() dto: AvatarDto, @User() user: IUser) {
    await this.service.updateAvatar(user.id, dto.avatar_url);
  }

  @ApiSignature({
    method: 'GET',
    path: '/logout',
    summary: 'logout user',
  })
  @ApiResponse({ status: 200, type: BaseResponse })
  @UserGuard()
  async userLogout(@UserAccessToken() token: string) {
    await this.service.logout(token);
  }

  @ApiSignature({
    method: 'GET',
    path: '/check',
    summary: 'check email or username exist in db. [email is first item to check, if send both data]',
  })
  @ApiQuery({ name: 'email', description: 'email you want to check', required: false })
  @ApiQuery({ name: 'mobile', description: 'mobile you want to check', required: false })
  @ApiResponse({ status: 200, type: BaseResponse })
  async list(@Query('email') email: string, @Query('mobile') mobile: string) {
    await this.service.validateNewEmailAndMobile({ email, mobile });
  }
}
