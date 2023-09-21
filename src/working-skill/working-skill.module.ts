import { Module } from '@nestjs/common';
import { WorkingSkillService } from './working-skill.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkingSkill } from './entity/working-skill.entity';
import { WorkingSkillController } from './working-skill.controller';

@Module({
  providers: [WorkingSkillService],
  imports: [TypeOrmModule.forFeature([WorkingSkill])],
  controllers: [WorkingSkillController]

})
export class WorkingSkillModule { }
