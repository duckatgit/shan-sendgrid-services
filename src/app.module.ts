import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendgridModule } from './sendgrid/sendgrid.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SendgridModule],
})
export class AppModule { }