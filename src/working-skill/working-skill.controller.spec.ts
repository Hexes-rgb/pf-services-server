import { Test, TestingModule } from '@nestjs/testing';
import { WorkingSkillController } from './working-skill.controller';

describe('WorkingSkillController', () => {
  let controller: WorkingSkillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkingSkillController],
    }).compile();

    controller = module.get<WorkingSkillController>(WorkingSkillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
