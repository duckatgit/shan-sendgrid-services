import { Test, TestingModule } from '@nestjs/testing';
import { SendgridController } from './sendgrid.controller';
import { SendgridService } from './sendgrid.service';
import { ConfigService } from '@nestjs/config';

describe('SendgridController', () => {
  let controller: SendgridController;
  let sendgridService: SendgridService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SendgridController],
      providers: [SendgridService, ConfigService],  // Add SendgridService and ConfigService here
    }).compile();

    controller = module.get<SendgridController>(SendgridController);
    sendgridService = module.get<SendgridService>(SendgridService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add more tests here to verify controller methods
});
