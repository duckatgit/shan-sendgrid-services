import { Module } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';
import { SendgridController } from './sendgrid.controller';

@Module({
  providers: [SendgridService],
  controllers: [SendgridController]
})
export class SendgridModule {}
