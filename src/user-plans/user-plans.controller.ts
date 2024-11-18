import { ApiSignature } from '@app/toolkit';
import { UserPlansService } from './user-plans.service';
import { Coach, User, UserGuard } from 'src/app.guards';
import { Controller, Param, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AllUserPlanResponse,
  AllUserPlansResponse,
  UserActivePlanResponse,
  UserPlansResponse,
} from './user-plans.responses';

@ApiTags('user plans')
@Controller('user-plans')
export class UserPlansController {
  constructor(private readonly service: UserPlansService) {}

  @ApiSignature({
    method: 'GET',
    path: '/',
    summary: '[dashboard] get list of user plans',
    isPagination: true,
  })
  @ApiQuery({
    name: 'search',
    description: 'search on plan title, user fullname and mobile',
    required: false,
  })
  @ApiQuery({ name: 'status', description: 'user plan status', required: false })
  @ApiResponse({ status: 200, type: AllUserPlansResponse })
  @UserGuard()
  async all(
    @Coach() _: IUser,
    @Query('page') page: string,
    @Query('take') take: string,
    @Query('search') search: string,
    @Query('status') status: string,
  ): Promise<AllUserPlansResponse> {
    const { data, meta } = await this.service.list({ page, take, status, search });
    return {
      user_plans: data,
      meta,
    };
  }

  @ApiSignature({
    method: 'GET',
    path: '/:id/show',
    summary: '[dashboard] get user plan info',
  })
  @ApiParam({ name: 'id', description: 'user plan id' })
  @ApiResponse({ status: 200, type: AllUserPlanResponse })
  async show(@Param('id') userPlanId: string): Promise<AllUserPlanResponse> {
    return {
      user_plan: await this.service.show(userPlanId),
    };
  }

  @ApiSignature({
    method: 'GET',
    path: '/user-history',
    summary: '[dashboard] get user plans history',
  })
  @ApiQuery({ name: 'user_id', description: 'user id', required: true })
  @ApiResponse({ status: 200, type: UserPlansResponse })
  @UserGuard()
  async userHistory(@Coach() _: IUser, @Query('user_id') userId: string): Promise<UserPlansResponse> {
    return {
      user_plans: userId ? await this.service.history(userId) : [],
    };
  }

  @ApiSignature({
    method: 'GET',
    path: '/history',
    summary: '[web-app] get logged in user plans history',
  })
  @ApiResponse({ status: 200, type: UserPlansResponse })
  @UserGuard()
  async history(@User() user: IUser): Promise<UserPlansResponse> {
    return {
      user_plans: await this.service.history(user.id),
    };
  }

  @ApiSignature({
    method: 'GET',
    path: '/active-plan',
    summary: '[web-app] get logged in user active plan',
  })
  @ApiResponse({ status: 200, type: UserActivePlanResponse })
  @UserGuard()
  async activePlan(@User() user: IUser): Promise<UserActivePlanResponse> {
    return {
      user_plan: await this.service.activePlan(user.id),
    };
  }
}
