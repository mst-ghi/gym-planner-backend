import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse, EquipmentModel } from '@app/shared';

export class EquipmentsResponse extends BaseResponse {
  @ApiProperty({ type: () => [EquipmentModel] })
  equipments: any;
}

export class EquipmentResponse extends BaseResponse {
  @ApiProperty({ type: () => EquipmentModel })
  equipment: any;
}
