import { UserGuard } from 'src/app.guards';
import { ApiSignature } from '@app/toolkit';
import { BodyPartDto } from './body-parts.dto';
import { BodyPartsService } from './body-parts.service';
import { Body, Controller, Param } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BodyPartResponse, BodyPartsResponse } from './body-parts.responses';

@ApiTags('body parts')
@Controller('body-parts')
export class BodyPartsController {
  constructor(private readonly service: BodyPartsService) {}

  @ApiSignature({
    method: 'GET',
    path: '/',
    summary: 'get body parts list data',
  })
  @ApiResponse({ status: 200, type: BodyPartsResponse })
  @UserGuard()
  async list(): Promise<BodyPartsResponse> {
    return {
      body_parts: await this.service.list(),
    };
  }

  @ApiSignature({
    method: 'GET',
    path: '/:id',
    summary: 'get body part data',
  })
  @ApiParam({ name: 'id', description: 'body part id' })
  @ApiResponse({ status: 200, type: BodyPartResponse })
  @UserGuard()
  async show(@Param('id') bodyPartId: string): Promise<BodyPartResponse> {
    return {
      body_part: await this.service.show(bodyPartId),
    };
  }

  @ApiSignature({
    method: 'POST',
    path: '/',
    summary: 'create body part',
  })
  @ApiResponse({ status: 200, type: BodyPartResponse })
  @UserGuard()
  async create(@Body() dto: BodyPartDto): Promise<BodyPartResponse> {
    return {
      body_part: await this.service.create(dto),
    };
  }

  @ApiSignature({
    method: 'PUT',
    path: '/:id',
    summary: 'update body part',
  })
  @ApiParam({ name: 'id', description: 'body part id' })
  @ApiResponse({ status: 200, type: BodyPartResponse })
  @UserGuard()
  async update(@Param('id') bodyPartId: string, @Body() dto: BodyPartDto): Promise<BodyPartResponse> {
    return {
      body_part: await this.service.update(bodyPartId, dto),
    };
  }
}
