import AppConfigs from './app.configs';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  ClassSerializerProvider,
  PrismaModule,
  RequestContextModule,
  Sha256Module,
  TransformProvider,
} from '@app/toolkit';

import { MailModule } from '@app/mail';
import { StorageModule } from '@app/storage';
import { BaseServiceModule, TokensModule } from '@app/shared';

import { AuthModule } from './auth/auth.module';
import { ReportsModule } from './reports/reports.module';
import { UploaderModule } from './uploader/uploader.module';
import { PlansModule } from './plans/plans.module';
import { UserPlansModule } from './user-plans/user-plans.module';
import { UsersModule } from './users/users.module';
import { MedicalRecordsModule } from './medical-records/medical-records.module';
import { EquipmentsModule } from './equipments/equipments.module';
import { BodyPartsModule } from './body-parts/body-parts.module';
import { ExercisesModule } from './exercises/exercises.module';
import { PostsModule } from './posts/posts.module';
import { WorkoutProgramsModule } from './workout-programs/workout-programs.module';
import { FoodProgramsModule } from './food-programs/food-programs.module';
import { UserWeightsModule } from './user-weights/user-weights.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [AppConfigs],
    }),
    StorageModule.register(AppConfigs().storage),
    Sha256Module.register(AppConfigs().sha256),
    BaseServiceModule,
    RequestContextModule,
    PrismaModule,
    MailModule,
    TokensModule,
    AuthModule,
    ReportsModule,
    UploaderModule,
    PlansModule,
    UserPlansModule,
    UsersModule,
    MedicalRecordsModule,
    EquipmentsModule,
    BodyPartsModule,
    ExercisesModule,
    PostsModule,
    WorkoutProgramsModule,
    FoodProgramsModule,
    UserWeightsModule,
  ],
  providers: [ClassSerializerProvider, TransformProvider],
})
export class AppModule {}
