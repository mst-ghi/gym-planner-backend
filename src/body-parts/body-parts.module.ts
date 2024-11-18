import { Module } from '@nestjs/common';
import { BodyPartsService } from './body-parts.service';
import { BodyPartsController } from './body-parts.controller';

@Module({
  controllers: [BodyPartsController],
  providers: [BodyPartsService],
})
export class BodyPartsModule {}
