import { BaseResponse, MedicalRecordModel } from '@app/shared';
import { ApiProperty } from '@nestjs/swagger';

export class MedicalRecordResponse extends BaseResponse {
  @ApiProperty({ type: () => MedicalRecordModel })
  medical_record: any;
}
