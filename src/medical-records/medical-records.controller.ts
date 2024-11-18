import { ApiSignature } from '@app/toolkit';
import { UserGuard } from 'src/app.guards';
import { Body, Controller, Param } from '@nestjs/common';
import { MedicalRecordDto } from './medical-records.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MedicalRecordsService } from './medical-records.service';
import { MedicalRecordResponse } from './medical-records.responses';

@ApiTags('medical records')
@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly service: MedicalRecordsService) {}

  @ApiSignature({
    method: 'PUT',
    path: '/',
    summary: 'upsert medical record info',
  })
  @ApiResponse({ status: 200, type: MedicalRecordResponse })
  @UserGuard()
  async upsert(@Body() dto: MedicalRecordDto): Promise<MedicalRecordResponse> {
    return {
      medical_record: await this.service.upsert(dto),
    };
  }

  @ApiSignature({
    method: 'GET',
    path: '/:id',
    summary: 'get medical record by id',
  })
  @ApiParam({ name: 'id', description: 'medical record id' })
  @ApiResponse({ status: 200, type: MedicalRecordResponse })
  @UserGuard()
  async fetchById(@Param('id') id: string): Promise<MedicalRecordResponse> {
    return {
      medical_record: await this.service.fetchById(id),
    };
  }

  @ApiSignature({
    method: 'GET',
    path: '/:userId/user',
    summary: 'get medical record by user id',
  })
  @ApiParam({ name: 'userId', description: 'user id' })
  @ApiResponse({ status: 200, type: MedicalRecordResponse })
  @UserGuard()
  async fetchByUserId(@Param('userId') userId: string): Promise<MedicalRecordResponse> {
    return {
      medical_record: (await this.service.fetchByUserId(userId)) || {},
    };
  }
}
