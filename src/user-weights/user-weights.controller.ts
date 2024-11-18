import { BaseResponse } from '@app/shared';
import { ApiSignature } from '@app/toolkit';
import { User, UserGuard } from 'src/app.guards';
import { UserWeightDto } from './user-weights.dto';
import { Body, Controller, Param } from '@nestjs/common';
import { UserWeightsService } from './user-weights.service';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserWeightResponse, UserWeightsResponse } from './user-weights.responses';

@ApiTags('user weights')
@Controller('user-weights')
export class UserWeightsController {
  constructor(private readonly service: UserWeightsService) {}

  @ApiSignature({
    method: 'GET',
    path: '/',
    summary: 'get user weights list',
  })
  @ApiResponse({ status: 200, type: UserWeightsResponse })
  @UserGuard()
  async list(@User() user: IUser): Promise<UserWeightsResponse> {
    return {
      weights: await this.service.list(user.id),
    };
  }

  @ApiSignature({
    method: 'POST',
    path: '/',
    summary: 'create user weight',
  })
  @ApiResponse({ status: 200, type: UserWeightResponse })
  @UserGuard()
  async create(@User() user: IUser, @Body() dto: UserWeightDto): Promise<UserWeightResponse> {
    return {
      weight: await this.service.create(dto, user.id),
    };
  }

  @ApiSignature({
    method: 'PUT',
    path: '/:id',
    summary: 'update user weight',
  })
  @ApiParam({ name: 'id', description: 'user weight id' })
  @ApiResponse({ status: 200, type: UserWeightResponse })
  @UserGuard()
  async update(
    @User() _: IUser,
    @Body() dto: UserWeightDto,
    @Param('id') weightId: string,
  ): Promise<UserWeightResponse> {
    return {
      weight: await this.service.update(weightId, dto),
    };
  }

  @ApiSignature({
    method: 'DELETE',
    path: '/:id',
    summary: 'delete user weight',
  })
  @ApiParam({ name: 'id', description: 'user weight id' })
  @ApiResponse({ status: 200, type: BaseResponse })
  @UserGuard()
  async delete(@User() _: IUser, @Param('id') weightId: string) {
    await this.service.delete(weightId);
  }
}
