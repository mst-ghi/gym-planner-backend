import { ApiSignature } from '@app/toolkit';
import { Coach, User, UserGuard } from 'src/app.guards';
import { Body, Controller, Param, Query } from '@nestjs/common';
import { WorkoutProgramDto } from './workout-programs.dto';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WorkoutProgramsService } from './workout-programs.service';
import {
  WorkoutProgramResponse,
  WorkoutProgramsResponse,
  WorkoutProgramsUserResponse,
} from './workout-programs.responses';

@ApiTags('workout programs')
@Controller('workout-programs')
export class WorkoutProgramsController {
  constructor(private readonly service: WorkoutProgramsService) {}

  @ApiSignature({
    method: 'GET',
    path: '/',
    summary: '[dashboard] get list of workout programs',
    isPagination: true,
  })
  @ApiQuery({ name: 'search', description: 'search on title & user fullname', required: false })
  @ApiResponse({ status: 200, type: WorkoutProgramsResponse })
  @UserGuard()
  async list(
    @Coach() _: IUser,
    @Query('page') page: string,
    @Query('take') take: string,
    @Query('search') search: string,
  ): Promise<WorkoutProgramsResponse> {
    const { data, meta } = await this.service.list({ page, take, search });
    return {
      workout_programs: data,
      meta,
    };
  }

  @ApiSignature({
    method: 'POST',
    path: '/',
    summary: '[dashboard] create new workout program',
  })
  @ApiResponse({ status: 200, type: WorkoutProgramResponse })
  @UserGuard()
  async create(@Body() dto: WorkoutProgramDto, @Coach() coach: IUser): Promise<WorkoutProgramResponse> {
    return {
      workout_program: await this.service.create(dto, coach),
    };
  }

  @ApiSignature({
    method: 'GET',
    path: '/:id/show',
    summary: '[dashboard] get workout program info',
  })
  @ApiParam({ name: 'id', description: 'workout program id' })
  @ApiResponse({ status: 200, type: WorkoutProgramResponse })
  @UserGuard()
  async show(@Param('id') workoutProgramId: string, @Coach() _: IUser): Promise<WorkoutProgramResponse> {
    return {
      workout_program: await this.service.show(workoutProgramId),
    };
  }

  @ApiSignature({
    method: 'GET',
    path: '/user',
    summary: '[dashboard] get workouts program by user id',
  })
  @ApiQuery({ name: 'user_id', description: 'user id', required: false })
  @ApiQuery({ name: 'user_plan_id', description: 'user plan id', required: false })
  @ApiResponse({ status: 200, type: WorkoutProgramsUserResponse })
  @UserGuard()
  async userPrograms(
    @Coach() _: IUser,
    @Query('user_id') userId: string,
    @Query('user_plan_id') userPlanId: string,
  ): Promise<WorkoutProgramsUserResponse> {
    return {
      workout_programs: await this.service.userPrograms({ userId, userPlanId }),
    };
  }

  @ApiSignature({
    method: 'GET',
    path: '/active',
    summary: 'get user active workout program',
  })
  @ApiResponse({ status: 200, type: WorkoutProgramResponse })
  @UserGuard()
  async userActiveProgram(@User() user: IUser): Promise<WorkoutProgramResponse> {
    return {
      workout_program: await this.service.userActiveProgram(user.id),
    };
  }

  @ApiSignature({
    method: 'PUT',
    path: '/:id',
    summary: '[dashboard] update workout program info',
  })
  @ApiParam({ name: 'id', description: 'workout program id' })
  @ApiResponse({ status: 200, type: WorkoutProgramResponse })
  @UserGuard()
  async update(
    @Coach() _: IUser,
    @Param('id') workoutProgramId: string,
    @Body() dto: WorkoutProgramDto,
  ): Promise<WorkoutProgramResponse> {
    return {
      workout_program: await this.service.update(workoutProgramId, dto),
    };
  }
}
