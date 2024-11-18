import { MedicalRecordDto } from './medical-records.dto';
import { BaseService, MedicalRecordSelect } from '@app/shared';

export class MedicalRecordsService extends BaseService {
  async fetchById(id: string, throwable = true) {
    const record = await this.prisma.medicalRecord.findFirst({
      where: { id: id },
      select: MedicalRecordSelect,
    });

    if (!record && throwable) {
      this.notFoundException('Medical record not found');
    }

    return record;
  }

  async fetchByUserId(userId: string) {
    return await this.prisma.medicalRecord.findFirst({
      where: { user_id: userId },
      select: MedicalRecordSelect,
    });
  }

  async upsert(dto: MedicalRecordDto) {
    const workspaceId = await this._workspaceId();
    try {
      return await this.prisma.medicalRecord.upsert({
        where: { user_id: dto.user_id, workspace_id: workspaceId },
        create: { ...dto, workspace_id: workspaceId },
        update: dto,
        select: MedicalRecordSelect,
      });
    } catch (error) {
      this.catchError(error, 'MedicalRecordsService');
    }
  }
}
