import * as dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { FoodProgramDto } from './food-programs.dto';
import { BaseService, FoodProgramSelect, FoodProgramStatusEnum } from '@app/shared';

@Injectable()
export class FoodProgramsService extends BaseService {
  async list({ page, take, search }: { page?: string; take?: string; search?: string } = {}) {
    const query: any = {
      where: {},
      orderBy: [{ created_at: 'desc' }],
      select: FoodProgramSelect,
    };

    if (search) {
      query['where']['OR'] = [
        { title: { contains: search } },
        {
          user: {
            fullname: { contains: search },
          },
        },
      ];
    }

    return this.prisma.paginate('foodProgram', { page, take }, query);
  }

  async userPrograms({ userId, userPlanId }: { userId?: string; userPlanId?: string }) {
    if (!userId && !userPlanId) {
      return [];
    }

    let where = {};

    if (userId) {
      where = { user_id: userId };
    }

    if (userPlanId) {
      where = { user_plan_id: userPlanId };
    }

    return this.prisma.foodProgram.findMany({
      where,
      orderBy: { created_at: 'desc' },
      select: FoodProgramSelect,
    });
  }

  async userActiveProgram(userId: string) {
    return await this.prisma.foodProgram.findFirst({
      where: {
        user_id: userId,
        ended_at: { gte: dayjs().toISOString() },
        status: { in: [FoodProgramStatusEnum.Active, FoodProgramStatusEnum.Free] },
      },
      select: FoodProgramSelect,
    });
  }

  async show(foodProgramId: string) {
    return await this.prisma.foodProgram.findFirst({
      where: { id: foodProgramId },
      select: FoodProgramSelect,
    });
  }

  async create(dto: FoodProgramDto, coach: IUser) {
    const [user, userPlan] = await this.findAndThrowByIds([
      { model: 'user', id: dto.user_id, field: 'user_id', message: 'User not found' },
      { model: 'userPlan', id: dto.user_plan_id, field: 'user_plan_id', message: 'User plan not found' },
    ]);

    try {
      const foodProgram = await this.prisma.foodProgram.create({
        data: {
          workspace_id: await this._workspaceId(),
          couch_id: coach.id,
          user_id: dto.user_id,
          user_plan_id: dto.user_plan_id,
          title: dto.title,
          description: dto.description || null,
          status: dto.status,
          started_at: dto.started_at || null,
          ended_at: dto.ended_at || null,
          items: {
            createMany: {
              data: dto.items.map((item) => ({
                cause: item.cause,
                content: item.content,
              })),
            },
          },
        },
        select: FoodProgramSelect,
      });

      return foodProgram;
    } catch (error) {
      this.catchError(error, 'FoodProgramsService');
    }
  }

  async update(foodProgramId: string, dto: FoodProgramDto) {
    const wp = await this.prisma.foodProgram.findFirst({
      where: { id: foodProgramId },
    });

    if (!wp) {
      this.notFoundException('Food program not found');
      return;
    }

    try {
      return await this.prisma.foodProgram.update({
        where: { id: wp.id },
        data: {
          user_plan_id: dto.user_plan_id,
          title: dto.title,
          description: dto.description || null,
          status: dto.status,
          started_at: dto.started_at || null,
          ended_at: dto.ended_at || null,
          items: {
            upsert: dto.items.map((item) => ({
              where: { id: item.id },
              create: {
                cause: item.cause,
                content: item.content,
              },
              update: {
                cause: item.cause,
                content: item.content,
              },
            })),
          },
        },
        select: FoodProgramSelect,
      });
    } catch (error) {
      this.catchError(error, 'FoodProgramsService');
    }
  }
}
