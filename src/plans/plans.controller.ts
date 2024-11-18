import { BaseResponse } from '@app/shared';
import { ApiSignature } from '@app/toolkit';
import { PlansService } from './plans.service';
import { PlanDto, PlanPaymentDto } from './plans.dto';
import { Body, Controller, Param } from '@nestjs/common';
import { Athlete, Coach, UserGuard } from 'src/app.guards';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlanCreatePaymentResponse, PlanResponse, PlansResponse } from './plans.responses';

@ApiTags('plans')
@Controller('plans')
export class PlansController {
  constructor(private readonly service: PlansService) {}

  @ApiSignature({
    method: 'GET',
    path: '/',
    summary: 'get plans list',
  })
  @ApiResponse({ status: 200, type: PlansResponse })
  async list(): Promise<PlansResponse> {
    return {
      plans: await this.service.list(),
    };
  }

  @ApiSignature({
    method: 'GET',
    path: '/:id',
    summary: 'get plan info',
  })
  @ApiParam({ name: 'id', description: 'plan id' })
  @ApiResponse({ status: 200, type: PlanResponse })
  async show(@Param('id') planId: string): Promise<PlanResponse> {
    return {
      plan: await this.service.show(planId),
    };
  }

  @ApiSignature({
    method: 'POST',
    path: '/',
    summary: 'create new plan',
  })
  @ApiResponse({ status: 200, type: PlanResponse })
  @UserGuard()
  async create(@Body() dto: PlanDto, @Coach('dashboard') _: IUser): Promise<PlanResponse> {
    return {
      plan: await this.service.create(dto),
    };
  }

  @ApiSignature({
    method: 'PUT',
    path: '/:id',
    summary: 'update plan',
  })
  @ApiParam({ name: 'id', description: 'plan id' })
  @ApiResponse({ status: 200, type: BaseResponse })
  @UserGuard()
  async update(@Body() dto: PlanDto, @Param('id') planId: string, @Coach('dashboard') _: IUser) {
    await this.service.update(planId, dto);
  }

  @ApiSignature({
    method: 'POST',
    path: '/create-payment',
    summary: 'plan create payment',
  })
  @ApiResponse({ status: 200, type: PlanCreatePaymentResponse })
  @UserGuard()
  async createPayment(
    @Body() dto: PlanPaymentDto,
    @Athlete() user: IUser,
  ): Promise<PlanCreatePaymentResponse> {
    return await this.service.createPayment(user, dto.plan_id);
  }
}
