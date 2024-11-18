import * as dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { BaseService, UserPlanFullSelect, UserPlanSelect, UserPlanStatusEnum } from '@app/shared';

@Injectable()
export class UserPlansService extends BaseService {
  async list({
    page,
    take,
    status,
    search,
  }: { page?: string; take?: string; status?: string; search?: string } = {}) {
    const query: any = {
      where: {},
      orderBy: [{ created_at: 'desc' }],
      select: UserPlanFullSelect,
    };

    if (status) {
      query.where['status'] = status;
    }

    if (search) {
      query['where']['OR'] = [
        {
          plan: {
            title: { contains: search },
          },
        },
        {
          user: {
            fullname: { contains: search },
          },
        },
        {
          user: {
            mobile: { contains: search },
          },
        },
      ];
    }

    return this.prisma.paginate('userPlan', { page, take }, query);
  }

  async show(userPlanId: string) {
    const userPlan = await this.prisma.userPlan.findFirst({
      where: { id: userPlanId },
      select: UserPlanFullSelect,
    });

    if (!userPlan) {
      this.notFoundException();
    }

    return userPlan;
  }

  async history(userId: string) {
    return await this.prisma.userPlan.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
      select: UserPlanSelect,
    });
  }

  async activePlan(userId: string) {
    return await this.prisma.userPlan.findFirst({
      where: {
        user_id: userId,
        status: { in: [UserPlanStatusEnum.Active, UserPlanStatusEnum.Ready] },
        expires_at: {
          gte: dayjs().toISOString(),
        },
      },
      select: UserPlanSelect,
    });
  }
}
