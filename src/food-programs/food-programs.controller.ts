import { ApiSignature } from '@app/toolkit';
import { Coach, User, UserGuard } from 'src/app.guards';
import { Body, Controller, Param, Query } from '@nestjs/common';
import { FoodProgramDto } from './food-programs.dto';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FoodProgramsService } from './food-programs.service';
import {
  FoodProgramResponse,
  FoodProgramsResponse,
  FoodProgramsUserResponse,
} from './food-programs.responses';

@ApiTags('food programs')
@Controller('food-programs')
export class FoodProgramsController {
  constructor(private readonly service: FoodProgramsService) {}

  @ApiSignature({
    method: 'GET',
    path: '/',
    summary: '[dashboard] get list of food programs',
    isPagination: true,
  })
  @ApiQuery({ name: 'search', description: 'search on title & user fullname', required: false })
  @ApiResponse({ status: 200, type: FoodProgramsResponse })
  @UserGuard()
  async list(
    @Coach() _: IUser,
    @Query('page') page: string,
    @Query('take') take: string,
    @Query('search') search: string,
  ): Promise<FoodProgramsResponse> {
    const { data, meta } = await this.service.list({ page, take, search });
    return {
      food_programs: data,
      meta,
    };
  }

  @ApiSignature({
    method: 'POST',
    path: '/',
    summary: '[dashboard] create new food program',
  })
  @ApiResponse({ status: 200, type: FoodProgramResponse })
  @UserGuard()
  async create(@Body() dto: FoodProgramDto, @Coach() coach: IUser): Promise<FoodProgramResponse> {
    return {
      food_program: await this.service.create(dto, coach),
    };
  }

  @ApiSignature({
    method: 'GET',
    path: '/:id/show',
    summary: '[dashboard] get food program info',
  })
  @ApiParam({ name: 'id', description: 'food program id' })
  @ApiResponse({ status: 200, type: FoodProgramResponse })
  @UserGuard()
  async show(@Param('id') foodProgramId: string, @Coach() _: IUser): Promise<FoodProgramResponse> {
    return {
      food_program: await this.service.show(foodProgramId),
    };
  }

  @ApiSignature({
    method: 'GET',
    path: '/user',
    summary: '[dashboard] get foods program by user id',
  })
  @ApiQuery({ name: 'user_id', description: 'user id', required: false })
  @ApiQuery({ name: 'user_plan_id', description: 'user plan id', required: false })
  @ApiResponse({ status: 200, type: FoodProgramsUserResponse })
  @UserGuard()
  async userPrograms(
    @Coach() _: IUser,
    @Query('user_id') userId: string,
    @Query('user_plan_id') userPlanId: string,
  ): Promise<FoodProgramsUserResponse> {
    return {
      food_programs: await this.service.userPrograms({ userId, userPlanId }),
    };
  }

  @ApiSignature({
    method: 'GET',
    path: '/active',
    summary: 'get user active food program',
  })
  @ApiResponse({ status: 200, type: FoodProgramResponse })
  @UserGuard()
  async userActiveProgram(@User() user: IUser): Promise<FoodProgramResponse> {
    return {
      food_program: await this.service.userActiveProgram(user.id),
    };
  }

  @ApiSignature({
    method: 'PUT',
    path: '/:id',
    summary: '[dashboard] update food program info',
  })
  @ApiParam({ name: 'id', description: 'food program id' })
  @ApiResponse({ status: 200, type: FoodProgramResponse })
  @UserGuard()
  async update(
    @Coach() _: IUser,
    @Param('id') foodProgramId: string,
    @Body() dto: FoodProgramDto,
  ): Promise<FoodProgramResponse> {
    return {
      food_program: await this.service.update(foodProgramId, dto),
    };
  }
}
