import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';
import * as handlebars from 'handlebars';

@Injectable()
export class SendgridService {
    constructor() {
        sgMail.setApiKey('<ADD your API key>');
    }

    async sendEmail(
        to: string[],
        subject: string,
        template: string,
        templateParams: any,
        cc?: string[],
        bcc?: string[],
        attachments?: any[],
    ) {
        const templateHtml = handlebars.compile(template)(templateParams);

        const msg = {
            to,
            from: 'shan@medaugur.com',
            subject,
            html: templateHtml,
            cc,
            bcc,
            attachments,
        };

        await sgMail.send(msg);
        return { status: 'success', message: 'Email sent successfully' };
    }

    async generatePreview(template: string, templateParams: any, type: 'txt' | 'html') {
        const compiledTemplate = handlebars.compile(template)(templateParams);
        return type === 'txt' ? compiledTemplate.replace(/<\/?[^>]+(>|$)/g, '') : compiledTemplate;
    }
}
