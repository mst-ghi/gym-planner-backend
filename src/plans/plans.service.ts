import * as dayjs from 'dayjs';
import { PlanDto } from './plans.dto';
import { Injectable } from '@nestjs/common';
import { addDate, BaseService, PaymentStatusEnum, UserKindEnum, UserPlanStatusEnum } from '@app/shared';

@Injectable()
export class PlansService extends BaseService {
  async list() {
    return await this.prisma.plan.findMany({ orderBy: { priority: 'desc' } });
  }

  async show(planId: string) {
    return await this.findOnePlan(planId);
  }

  async create(dto: PlanDto) {
    try {
      return await this.prisma.plan.create({
        data: {
          ...dto,
          workspace_id: await this._workspaceId(),
        },
      });
    } catch (error) {
      this.catchError(error, 'PlansService');
    }
  }

  async update(planId: string, dto: PlanDto) {
    const plan = await this.findOnePlan(planId);

    try {
      await this.prisma.plan.update({ where: { id: plan.id }, data: dto });
    } catch (error) {
      this.catchError(error, 'PlansService');
    }
  }

  async createPayment(user: IUser, planId: string) {
    if (user.kind !== UserKindEnum.Athlete) {
      this.badRequestException();
    }

    const userPlan = await this.prisma.userPlan.findFirst({
      where: {
        user_id: user.id,
        status: { in: [UserPlanStatusEnum.Active, UserPlanStatusEnum.Ready] },
        expires_at: {
          gte: dayjs().toISOString(),
        },
      },
    });

    if (userPlan) {
      this.badRequestException('You currently have an active plan');
    }

    const plan = await this.findOnePlan(planId);

    try {
      let totalPrice = 0;
      let discountPrice = 0;

      if (plan.price > 0) {
        if (plan.discount <= 0) {
          totalPrice = plan.price;
        } else {
          discountPrice = (plan.price * plan.discount) / 100;

          if (discountPrice <= 0) {
            discountPrice = 0;
          }

          totalPrice = plan.price - discountPrice;

          if (totalPrice <= 0) {
            totalPrice = 0;
          }
        }
      }

      return await this.prisma.$transaction(async (tx) => {
        const txPayment = await tx.payment.create({
          data: {
            user_id: user.id,
            plan_id: plan.id,
            total_price: totalPrice,
            discount_price: discountPrice,
            meta: plan,
            status: totalPrice > 0 ? PaymentStatusEnum.Created : PaymentStatusEnum.Paid,
          },
        });

        let txUserPlan;

        if (totalPrice === 0) {
          txUserPlan = await tx.userPlan.create({
            data: {
              workspace_id: await this._workspaceId(),
              user_id: user.id,
              plan_id: plan.id,
              payment_id: txPayment.id,
              plan_snapshot: plan,
              status: UserPlanStatusEnum.Active,
              reservation_at: null,
              expires_at: addDate(plan.period_value, plan.period_type as dayjs.ManipulateType),
            },
          });
        }

        return {
          payment: txPayment,
          userPlan: txUserPlan,
        };
      });
    } catch (error) {
      this.catchError(error, 'PlansService');
    }
  }

  async findOnePlan(planId: string, throwable = true) {
    const plan = await this.prisma.plan.findFirst({ where: { id: planId } });

    if (!plan && throwable) {
      this.notFoundException();
    }

    return plan;
  }
}
