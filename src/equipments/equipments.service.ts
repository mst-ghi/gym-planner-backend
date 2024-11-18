import { Injectable } from '@nestjs/common';
import { EquipmentDto } from './equipments.dto';
import { BaseService, EquipmentSelect } from '@app/shared';

@Injectable()
export class EquipmentsService extends BaseService {
  async list() {
    return await this.prisma.equipment.findMany({
      where: { workspace_id: await this._workspaceId() },
      orderBy: { created_at: 'desc' },
      select: EquipmentSelect,
    });
  }

  async show(equipmentId: string) {
    const equipment = await this.prisma.equipment.findFirst({
      where: { id: equipmentId, workspace_id: await this._workspaceId() },
      select: EquipmentSelect,
    });

    if (!equipment) {
      this.notFoundException('Equipment not found');
    }

    return equipment;
  }

  async create(dto: EquipmentDto) {
    try {
      return await this.prisma.equipment.create({
        data: {
          workspace_id: await this._workspaceId(),
          ...dto,
        },
      });
    } catch (error) {
      this.catchError(error, 'EquipmentsService');
    }
  }

  async update(equipmentId: string, dto: EquipmentDto) {
    const equipment = await this.show(equipmentId);

    try {
      return await this.prisma.equipment.update({
        where: { id: equipment.id },
        data: dto,
        select: EquipmentSelect,
      });
    } catch (error) {
      this.catchError(error, 'EquipmentsService');
    }
  }
}
