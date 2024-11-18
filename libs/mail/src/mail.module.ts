import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { Template } from './template';

@Global()
@Module({
  providers: [MailService, Template],
  exports: [MailService],
})
export class MailModule {}
