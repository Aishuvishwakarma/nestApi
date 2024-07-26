import { Test, TestingModule } from '@nestjs/testing';
import { EmploymentsController } from './employments.controller';

describe('EmploymentsController', () => {
  let controller: EmploymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmploymentsController],
    }).compile();

    controller = module.get<EmploymentsController>(EmploymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
