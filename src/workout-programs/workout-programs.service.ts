import * as dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { WorkoutProgramDto, WorkoutProgramItemDto } from './workout-programs.dto';
import { BaseService, UserPlanStatusEnum, WorkoutProgramSelect, WorkoutProgramStatusEnum } from '@app/shared';

@Injectable()
export class WorkoutProgramsService extends BaseService {
  async list({ page, take, search }: { page?: string; take?: string; search?: string } = {}) {
    const query: any = {
      where: {},
      orderBy: [{ created_at: 'desc' }],
      select: WorkoutProgramSelect,
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

    return this.prisma.paginate('workoutProgram', { page, take }, query);
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

    return this.prisma.workoutProgram.findMany({
      where,
      orderBy: { created_at: 'desc' },
      select: WorkoutProgramSelect,
    });
  }

  async userActiveProgram(userId: string) {
    return await this.prisma.workoutProgram.findFirst({
      where: {
        user_id: userId,
        ended_at: { gte: dayjs().toISOString() },
        status: { in: [WorkoutProgramStatusEnum.Active, WorkoutProgramStatusEnum.Free] },
      },
      select: WorkoutProgramSelect,
    });
  }

  async show(workoutProgramId: string) {
    return await this.prisma.workoutProgram.findFirst({
      where: { id: workoutProgramId },
      select: WorkoutProgramSelect,
    });
  }

  async create(dto: WorkoutProgramDto, coach: IUser) {
    const [user, userPlan] = await this.findAndThrowByIds([
      { model: 'user', id: dto.user_id, field: 'user_id', message: 'User not found' },
      { model: 'userPlan', id: dto.user_plan_id, field: 'user_plan_id', message: 'User plan not found' },
    ]);

    await this.validateItems(dto.items);

    try {
      const wp = await this.prisma.workoutProgram.create({
        data: {
          workspace_id: await this._workspaceId(),
          couch_id: coach.id,
          user_id: dto.user_id,
          user_plan_id: dto.user_plan_id,
          title: dto.title,
          description: dto.description || null,
          voice_url: dto.voice_url || null,
          status: dto.status,
          started_at: dto.started_at || null,
          ended_at: dto.ended_at || null,
          items: {
            createMany: {
              data: dto.items.map((item) => ({
                exercise_id: item.exercise_id,
                day: item.day,
                priority: item.priority,
                frequency: item.frequency,
                times: item.times,
                is_super: item.is_super,
              })),
            },
          },
        },
        select: WorkoutProgramSelect,
      });

      if (dto.user_plan_id) {
        await this.setUserPlanStatus(dto.user_plan_id, UserPlanStatusEnum.Ready);
      }

      return wp;
    } catch (error) {
      this.catchError(error, 'WorkoutProgramsService');
    }
  }

  async update(workoutProgramId: string, dto: WorkoutProgramDto) {
    const wp = await this.prisma.workoutProgram.findFirst({
      where: { id: workoutProgramId },
    });

    if (!wp) {
      this.notFoundException('Training program not found');
      return;
    }

    try {
      const program = await this.prisma.workoutProgram.update({
        where: { id: wp.id },
        data: {
          user_plan_id: dto.user_plan_id,
          title: dto.title,
          description: dto.description || null,
          voice_url: dto.voice_url || null,
          status: dto.status,
          started_at: dto.started_at || null,
          ended_at: dto.ended_at || null,
          items: {
            upsert: dto.items.map((item) => ({
              where: { id: item.id },
              create: {
                exercise_id: item.exercise_id,
                day: item.day,
                priority: item.priority,
                frequency: item.frequency,
                times: item.times,
                is_super: item.is_super,
              },
              update: {
                exercise_id: item.exercise_id,
                day: item.day,
                priority: item.priority,
                frequency: item.frequency,
                times: item.times,
                is_super: item.is_super,
              },
            })),
          },
        },
        select: WorkoutProgramSelect,
      });

      if (dto.user_plan_id) {
        await this.setUserPlanStatus(dto.user_plan_id, UserPlanStatusEnum.Ready);
      }

      return program;
    } catch (error) {
      this.catchError(error, 'WorkoutProgramsService');
    }
  }

  async validateItems(items: WorkoutProgramItemDto[]) {
    const exerciseIds = items.map((el) => el.exercise_id);
    await this.findAndThrowByIds([
      {
        model: 'exercise',
        field: 'exercise_id',
        ids: exerciseIds.filter((value, index, array) => array.indexOf(value) === index),
        message: 'One or more selected exercises are invalid',
      },
    ]);
  }

  async setUserPlanStatus(userPlanId: string, status: UserPlanStatusEnum) {
    await this.prisma.userPlan.update({
      where: { id: userPlanId },
      data: { status },
    });
  }
}
