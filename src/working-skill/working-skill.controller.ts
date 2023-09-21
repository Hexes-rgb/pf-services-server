import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { WorkingSkillService } from './working-skill.service';
import { WorkingSkillDto } from './dto/working-skill.dto';
import { Request } from 'express';

@Controller('working-skill')
export class WorkingSkillController {
    constructor(private readonly workingSkillService: WorkingSkillService) { }

    @Post('create')
    async createWorkingSkill(@Body() workingSkill: WorkingSkillDto, @Req() req: Request) {
        const user = req['user']
        return await this.workingSkillService.createWorkingSkill(workingSkill, user.id)
    }

    @Put('change/:id')
    async changeWorkingSkill(@Param('id', ParseIntPipe) id: number, @Body() workingSkill: WorkingSkillDto, @Req() req: Request) {
        const user = req['user']
        return await this.workingSkillService.changeWorkingSkill(id, user.id, workingSkill)
    }

    @Delete('delete/:id')
    async deleteWorkingSkill(@Param('id', ParseIntPipe) id: number) {
        return await this.workingSkillService.deleteWorkingSkill(id)
    }
}
