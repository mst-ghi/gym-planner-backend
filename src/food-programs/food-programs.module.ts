import { Module } from '@nestjs/common';
import { FoodProgramsService } from './food-programs.service';
import { FoodProgramsController } from './food-programs.controller';

@Module({
  controllers: [FoodProgramsController],
  providers: [FoodProgramsService],
})
export class FoodProgramsModule {}
