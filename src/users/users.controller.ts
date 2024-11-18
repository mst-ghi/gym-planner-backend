import { UserKindEnum } from '@app/shared';
import { UserGuard } from 'src/app.guards';
import { ApiSignature } from '@app/toolkit';
import { UsersService } from './users.service';
import { Controller, Param, Query } from '@nestjs/common';
import { UserResponse, UsersResponse } from './users.responses';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @ApiSignature({
    method: 'GET',
    path: '/',
    summary: 'get users list',
    isPagination: true,
  })
  @ApiQuery({
    name: 'kind',
    description: 'user kind',
    required: false,
    enum: UserKindEnum,
  })
  @ApiQuery({ name: 'search', description: 'user email, name (first, last), username', required: false })
  @ApiQuery({ name: 'short', description: 'any value to get shortly list', required: false })
  @ApiQuery({ name: 'user_id', description: 'user_id', required: false })
  @ApiResponse({ status: 200, type: UsersResponse })
  @UserGuard()
  async list(
    @Query('kind') kind: string,
    @Query('page') page: string,
    @Query('take') take: string,
    @Query('search') search: string,
    @Query('short') short: string,
    @Query('user_id') userId: string,
  ): Promise<UsersResponse> {
    const { data, meta } = await this.service.list({ kind, page, take, search, userId }, Boolean(short));
    return {
      users: data,
      meta,
    };
  }

  @ApiSignature({
    method: 'GET',
    path: '/:id',
    summary: 'get user data by user id',
  })
  @ApiParam({ name: 'id', description: 'user id' })
  @ApiResponse({ status: 200, type: UserResponse })
  @UserGuard()
  async show(@Param('id') userId: string): Promise<UserResponse> {
    return {
      user: await this.service.show(userId),
    };
  }
}
