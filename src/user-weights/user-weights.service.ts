import { BaseService, UserWeightSelect } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { UserWeightDto } from './user-weights.dto';

@Injectable()
export class UserWeightsService extends BaseService {
  async list(userId: string) {
    return this.prisma.userWeight.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
      select: UserWeightSelect,
    });
  }

  async create(dto: UserWeightDto, userId: string) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const weight = await tx.userWeight.create({
          data: {
            workspace_id: await this._workspaceId(),
            user_id: userId,
            weight: dto.weight,
            date: dto.date,
          },
          select: UserWeightSelect,
        });

        await tx.profile.update({
          where: { user_id: userId },
          data: { weight: dto.weight },
        });

        return weight;
      });
    } catch (error) {
      this.catchError(error, 'UserWeightsService');
    }
  }

  async update(weightId: string, dto: UserWeightDto) {
    await this.findWeightById(weightId);

    try {
      return await this.prisma.userWeight.update({
        where: { id: weightId },
        data: {
          weight: dto.weight,
          date: dto.date,
        },
        select: UserWeightSelect,
      });
    } catch (error) {
      this.catchError(error, 'UserWeightsService');
    }
  }

  async delete(weightId: string) {
    await this.findWeightById(weightId);

    try {
      await this.prisma.userWeight.delete({
        where: { id: weightId },
      });
    } catch (error) {
      this.catchError(error, 'UserWeightsService');
    }
  }

  async findWeightById(weightId: string) {
    const weight = await this.prisma.userWeight.findFirst({
      where: { id: weightId },
      select: UserWeightSelect,
    });

    if (!weight) {
      this.notFoundException();
    }

    return weight;
  }
}
