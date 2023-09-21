import { BadRequestException, Delete, Injectable } from '@nestjs/common';
import { WorkingSkill } from './entity/working-skill.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkingSkillDto } from './dto/working-skill.dto';

@Injectable()
export class WorkingSkillService {
    constructor(@InjectRepository(WorkingSkill) private readonly workingSkillRepository: Repository<WorkingSkill>) { }

    async createWorkingSkill(dto: WorkingSkillDto, userId: number) {
        try {
            const workingSkill = await this.workingSkillRepository.create({
                title: dto.title,
                description: dto.description || '',
            });
            return this.workingSkillRepository.save(workingSkill)
        } catch (e) {
            console.log(e);

        }
    }

    async changeWorkingSkill(workingSkillId: number, userId, workingSkillDto: WorkingSkillDto) {
        const { description, title } = workingSkillDto
        const workingSkill = await this.workingSkillRepository.findOne({
            where: {
                id: workingSkillId
            }
        })
        if (!workingSkill) {
            throw new BadRequestException('Working skill not found')
        }
        workingSkill.title = title
        workingSkill.description = description || ''


        const result = await this.workingSkillRepository.save(workingSkill)
        return result
    }

    async deleteWorkingSkill(id: number) {
        const workingSkill = await this.workingSkillRepository.findOne({
            where: {
                id
            }
        })
        if (!workingSkill) {
            throw new BadRequestException(' Working Skill card not found')
        }
        return await this.workingSkillRepository.delete({ id })
    }



}
