import { BaseService, ExerciseSelect } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { CreateExerciseDto, UpdateExerciseDto } from './exercises.dto';

export interface ExerciseListUrlQueries {
  page?: string;
  take?: string;
  search?: string;
  gender?: string;
  bodyPartId?: string;
  equipmentId?: string;
}

@Injectable()
export class ExercisesService extends BaseService {
  async list(queries: ExerciseListUrlQueries) {
    const { page, take, search, gender, bodyPartId, equipmentId } = queries;

    const query: any = {
      where: {},
      orderBy: [{ created_at: 'desc' }],
      select: ExerciseSelect,
    };

    if (bodyPartId) {
      query['where']['body_part_id'] = bodyPartId;
    }

    if (equipmentId) {
      query['where']['equipment_id'] = equipmentId;
    }

    if (gender) {
      query['where']['gender'] = gender;
    }

    if (search) {
      query['where']['OR'] = [
        { title: { contains: search } },
        {
          bodyPart: {
            title: { contains: search },
          },
        },
        {
          equipment: {
            title: { contains: search },
          },
        },
      ];
    }

    return this.prisma.paginate('exercise', { page, take }, query);
  }

  async show(exerciseId: string) {
    const exercise = await this.prisma.exercise.findFirst({
      where: { id: exerciseId },
      select: ExerciseSelect,
    });

    if (!exercise) {
      this.notFoundException('The desired exercise was not found');
    }

    return exercise;
  }

  async create(dto: CreateExerciseDto) {
    await this.findBodyPartById(dto.body_part_id);

    if (dto.equipment_id) {
      await this.findEquipmentById(dto.equipment_id);
    }

    try {
      return await this.prisma.exercise.create({
        data: {
          ...dto,
          equipment_id: dto.equipment_id || null,
        },
        select: ExerciseSelect,
      });
    } catch (error) {
      this.catchError(error, 'ExercisesService');
    }
  }

  async update(exerciseId: string, dto: UpdateExerciseDto) {
    const exercise = await this.findExerciseById(exerciseId);

    await this.findBodyPartById(dto.body_part_id);

    if (dto.equipment_id) {
      await this.findEquipmentById(dto.equipment_id);
    }

    try {
      return await this.prisma.exercise.update({
        where: { id: exercise.id },
        data: {
          ...dto,
          equipment_id: dto.equipment_id || null,
        },
        select: ExerciseSelect,
      });
    } catch (error) {
      this.catchError(error, 'ExercisesService');
    }
  }

  async findExerciseById(exerciseId: string, throwable = true) {
    const exercise = await this.prisma.exercise.findFirst({
      where: { id: exerciseId },
      select: ExerciseSelect,
    });

    if (!exercise && throwable) {
      this.notFoundException('The desired exercise was not found');
    }

    return exercise;
  }

  async findBodyPartById(partId: string, throwable = true) {
    const bodyPart = await this.prisma.bodyPart.findFirst({
      where: { id: partId },
    });

    if (!bodyPart && throwable) {
      this.notFoundException('Body part not found');
    }

    return bodyPart;
  }

  async findEquipmentById(equipmentId: string, throwable = true) {
    const equipment = await this.prisma.equipment.findFirst({
      where: { id: equipmentId },
    });

    if (!equipment && throwable) {
      this.notFoundException('Equipment not found');
    }

    return equipment;
  }
}
