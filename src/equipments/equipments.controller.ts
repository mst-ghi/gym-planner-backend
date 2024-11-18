import { UserGuard } from 'src/app.guards';
import { ApiSignature } from '@app/toolkit';
import { EquipmentDto } from './equipments.dto';
import { EquipmentsService } from './equipments.service';
import { Body, Controller, Param } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EquipmentResponse, EquipmentsResponse } from './equipments.responses';

@ApiTags('equipments')
@Controller('equipments')
export class EquipmentsController {
  constructor(private readonly service: EquipmentsService) {}

  @ApiSignature({
    method: 'GET',
    path: '/',
    summary: 'get body parts list data',
  })
  @ApiResponse({ status: 200, type: EquipmentsResponse })
  @UserGuard()
  async list(): Promise<EquipmentsResponse> {
    return {
      equipments: await this.service.list(),
    };
  }

  @ApiSignature({
    method: 'GET',
    path: '/:id',
    summary: 'get body part data',
  })
  @ApiParam({ name: 'id', description: 'body part id' })
  @ApiResponse({ status: 200, type: EquipmentResponse })
  @UserGuard()
  async show(@Param('id') equipmentId: string): Promise<EquipmentResponse> {
    return {
      equipment: await this.service.show(equipmentId),
    };
  }

  @ApiSignature({
    method: 'POST',
    path: '/',
    summary: 'create body part',
  })
  @ApiResponse({ status: 200, type: EquipmentResponse })
  @UserGuard()
  async create(@Body() dto: EquipmentDto): Promise<EquipmentResponse> {
    return {
      equipment: await this.service.create(dto),
    };
  }

  @ApiSignature({
    method: 'PUT',
    path: '/:id',
    summary: 'update body part',
  })
  @ApiParam({ name: 'id', description: 'body part id' })
  @ApiResponse({ status: 200, type: EquipmentResponse })
  @UserGuard()
  async update(@Param('id') equipmentId: string, @Body() dto: EquipmentDto): Promise<EquipmentResponse> {
    return {
      equipment: await this.service.update(equipmentId, dto),
    };
  }
}
