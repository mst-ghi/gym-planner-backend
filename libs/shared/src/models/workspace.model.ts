import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from './base.model';
import { WorkspaceStatusEnum } from '../enums';

export class WorkspaceModel extends BaseModel {
  @ApiProperty()
  key: string;

  @ApiProperty()
  title: string | null;

  @ApiProperty({ enum: WorkspaceStatusEnum })
  status: WorkspaceStatusEnum;
}
