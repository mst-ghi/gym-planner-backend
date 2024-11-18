import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService, AuthGoogleService } from './services';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGoogleService],
})
export class AuthModule {}
