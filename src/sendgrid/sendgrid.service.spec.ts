import { Test, TestingModule } from '@nestjs/testing';
import { SendgridService } from './sendgrid.service';
import * as sgMail from '@sendgrid/mail';
import * as fs from 'fs';
import * as path from 'path';



describe('SendgridService', () => {
  let service: SendgridService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendgridService],
    }).compile();

    service = module.get<SendgridService>(SendgridService);
  });


  it('should send email successfully', async () => {
    const to = ['npcomplete415@gmail.com'];
    const subject = 'Test Subject';
    const template = '<p>Hello {{name}}</p>';
    const templateParams = { name: 'John' };
    const cc = ['kapil@yopmail.com']

    const filePath = path.join(__dirname, 'sample.pdf');
    const fileContent = fs.readFileSync(filePath).toString('base64');

    const attachments: any = [
      {
        content: fileContent,
        filename: 'file.pdf',
        type: 'application/pdf',
        disposition: 'attachment',
      },
    ];

    const result = await service.sendEmail(to, subject, template, templateParams, cc, undefined, attachments);
    expect(result).toEqual({ status: 'success', message: 'Email sent successfully' });
  }, 10000);

  it('should generate HTML preview', async () => {
    const template = '<p>Hello {{name}}</p>';
    const params = { name: 'John' };
    const result = await service.generatePreview(template, params, 'html');
    expect(result).toBe('<p>Hello John</p>');
  });

  it('should generate text preview', async () => {
    const template = '<p>Hello {{name}}</p>';
    const params = { name: 'John' };
    const result = await service.generatePreview(template, params, 'txt');
    expect(result).toBe('Hello John');
  });
});
