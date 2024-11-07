import { Test, TestingModule } from '@nestjs/testing';
import { SendgridService } from './sendgrid.service';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

jest.mock('@sendgrid/mail');

describe('SendgridService', () => {
  let service: SendgridService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendgridService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<SendgridService>(SendgridService);
    configService = module.get<ConfigService>(ConfigService);

    jest.spyOn(sgMail, 'send').mockResolvedValue([{ statusCode: 202 }] as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send email successfully', async () => {
    const to = ['manas@yopmail.com'];
    const subject = 'Test Subject';
    const template = '<p>Hello {{name}}</p>';
    const templateParams = { name: 'John' };

    const result = await service.sendEmail(to, subject, template, templateParams);
    expect(result).toEqual({ status: 'success', message: 'Email sent successfully' });
    expect(sgMail.send).toHaveBeenCalled();
  });

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
