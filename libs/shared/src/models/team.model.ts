import { ApiProperty } from '@nestjs/swagger';
import { TeamRoleEnum } from '../enums';
import { WorkspaceModel } from './workspace.model';

export class TeamModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  workspace_id: string;

  @ApiProperty()
  user_id: string;

  @ApiProperty({ enum: TeamRoleEnum })
  role: TeamRoleEnum;

  @ApiProperty()
  selected: boolean;

  @ApiProperty()
  created_at?: Date;

  @ApiProperty({ type: () => WorkspaceModel, required: false })
  workspace?: WorkspaceModel;
}
