import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from './contact.controller';
import { ContactsService } from './contact.service';

describe('ContactController', () => {
  let controller: ContactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [ContactsService],
    }).compile();

    controller = module.get<ContactsController>(ContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
