import { GenderEnum } from '@app/shared';
import { UserGuard } from 'src/app.guards';
import { ApiSignature } from '@app/toolkit';
import { ExercisesService } from './exercises.service';
import { Body, Controller, Param, Query } from '@nestjs/common';
import { CreateExerciseDto, UpdateExerciseDto } from './exercises.dto';
import { ExerciseResponse, ExercisesResponse } from './exercises.responses';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('exercises')
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly service: ExercisesService) {}

  @ApiSignature({
    method: 'GET',
    path: '/',
    summary: 'get exercises list data',
    isPagination: true,
  })
  @ApiQuery({
    name: 'search',
    description: 'search on exercise title, body-part title, equipment title',
    required: false,
  })
  @ApiQuery({ name: 'body_part_id', description: 'body part id', required: false })
  @ApiQuery({ name: 'equipment_id', description: 'equipment id', required: false })
  @ApiQuery({ name: 'gender', description: 'exercise gender', required: false, enum: GenderEnum })
  @ApiResponse({ status: 200, type: ExercisesResponse })
  @UserGuard()
  async list(
    @Query('page') page: string,
    @Query('take') take: string,
    @Query('search') search: string,
    @Query('gender') gender: string,
    @Query('body_part_id') bodyPartId: string,
    @Query('equipment_id') equipmentId: string,
  ): Promise<ExercisesResponse> {
    const { data, meta } = await this.service.list({ page, take, search, gender, bodyPartId, equipmentId });
    return {
      exercises: data,
      meta,
    };
  }

  @ApiSignature({
    method: 'GET',
    path: '/:id',
    summary: 'get exercise info',
  })
  @ApiParam({ name: 'id', description: 'exercise id' })
  @ApiResponse({ status: 200, type: ExerciseResponse })
  async show(@Param('id') exerciseId: string): Promise<ExerciseResponse> {
    return {
      exercise: await this.service.show(exerciseId),
    };
  }

  @ApiSignature({
    method: 'POST',
    path: '/',
    summary: 'create exercise',
  })
  @ApiResponse({ status: 200, type: ExerciseResponse })
  @UserGuard()
  async create(@Body() dto: CreateExerciseDto): Promise<ExerciseResponse> {
    return {
      exercise: await this.service.create(dto),
    };
  }

  @ApiSignature({
    method: 'PUT',
    path: '/:id',
    summary: 'update exercise',
  })
  @ApiParam({ name: 'id', description: 'exercise id' })
  @ApiResponse({ status: 200, type: ExercisesResponse })
  @UserGuard()
  async update(@Param('id') exerciseId: string, @Body() dto: UpdateExerciseDto): Promise<ExerciseResponse> {
    return {
      exercise: await this.service.update(exerciseId, dto),
    };
  }
}
