import { Injectable } from '@nestjs/common';
import { BodyPartDto } from './body-parts.dto';
import { BaseService, BodyPartSelect } from '@app/shared';

@Injectable()
export class BodyPartsService extends BaseService {
  async list() {
    return await this.prisma.bodyPart.findMany({
      where: { workspace_id: await this._workspaceId() },
      orderBy: { created_at: 'desc' },
      select: BodyPartSelect,
    });
  }

  async show(bodyPartId: string) {
    const bodyPart = await this.prisma.bodyPart.findFirst({
      where: { id: bodyPartId, workspace_id: await this._workspaceId() },
      select: BodyPartSelect,
    });

    if (!bodyPart) {
      this.notFoundException('Body part not found');
    }

    return bodyPart;
  }

  async create(dto: BodyPartDto) {
    try {
      return await this.prisma.bodyPart.create({
        data: {
          workspace_id: await this._workspaceId(),
          ...dto,
        },
      });
    } catch (error) {
      this.catchError(error, 'BodyPartsService');
    }
  }

  async update(bodyPartId: string, dto: BodyPartDto) {
    const bodyPart = await this.show(bodyPartId);

    try {
      return await this.prisma.bodyPart.update({
        where: { id: bodyPart.id },
        data: dto,
        select: BodyPartSelect,
      });
    } catch (error) {
      this.catchError(error, 'BodyPartsService');
    }
  }
}
