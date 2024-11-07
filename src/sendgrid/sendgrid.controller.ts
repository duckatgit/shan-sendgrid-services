import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { SendgridService } from './sendgrid.service';

@Controller('sendgrid')
export class SendgridController {
    constructor(private readonly sendgridService: SendgridService) { }

    @Post()
    async sendEmail(@Body() body: any) {
        const { to, subject, template, templateParams, cc, bcc, attachments } = body;
        return await this.sendgridService.sendEmail(to, subject, template, templateParams, cc, bcc, attachments);
    }

    @Get()
    async previewEmail(
        @Query('template') template: string,
        @Query('type') type: 'txt' | 'html',
        @Query() params: any,
    ) {
        return await this.sendgridService.generatePreview(template, params, type);
    }
}
