import { BaseService, UserPlanStatusEnum, UserStatusEnum } from '@app/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService extends BaseService {
  async dashboardCards() {
    return this.prisma.$transaction(async (tx) => {
      const users = await tx.user.count({ where: { status: UserStatusEnum.Active } });
      const posts = await tx.post.count();
      const equipments = await tx.equipment.count();
      const bodyParts = await tx.bodyPart.count();
      const exercises = await tx.exercise.count();
      const workoutPrograms = await tx.workoutProgram.count();
      const userPlans = await tx.userPlan.count({ where: { status: { not: UserPlanStatusEnum.Canceled } } });
      const readyUserPlans = await tx.userPlan.count({
        where: { status: UserPlanStatusEnum.Active },
      });

      return {
        users_count: users,
        posts_count: posts,
        equipments_count: equipments,
        body_parts_count: bodyParts,
        exercises_count: exercises,
        workout_programs_count: workoutPrograms,
        user_plans_count: userPlans,
        ready_user_plans_count: readyUserPlans,
      };
    });
  }
}
