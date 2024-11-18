import { Module } from '@nestjs/common';
import { UserWeightsService } from './user-weights.service';
import { UserWeightsController } from './user-weights.controller';

@Module({
  controllers: [UserWeightsController],
  providers: [UserWeightsService],
})
export class UserWeightsModule {}
