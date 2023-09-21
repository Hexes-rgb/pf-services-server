import { Body, Controller, Delete, Param, Post, Put, Req, Res, UsePipes } from '@nestjs/common';
import { UserActivityService } from './user-activity.service';
import { CreateUserActivityDto } from './dto/create-user-activity.dto';
import { Request, Response } from 'express';
import { CreateUserActivityPipe } from './create-user-activity.pipe';
import { Activity } from 'src/activity/entity/activity.entity';
import { UserActivity } from './entity/user-activity.entity';

@Controller('user-activity')
export class UserActivityController {
    constructor(private readonly userActivityService: UserActivityService) { }


    @Post('create')
    @UsePipes(new CreateUserActivityPipe())
    async create(@Body() createUserActivityDto: CreateUserActivityDto, @Req() req: Request) {
        const user = req['user'];
        return await this.userActivityService.createUserActivity(createUserActivityDto, user)
    }

    @Put('change/:id')
    @UsePipes(new CreateUserActivityPipe())
    async change(@Body() createUserActivityDto: CreateUserActivityDto, @Param('id') id: number, @Req() req: Request, @Res({ passthrough: true }) res: Response) {        
        const user = req['user'];
        const userActivity = await this.userActivityService.changeUserActivity(createUserActivityDto, id, user);
        return userActivity;
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: number, @Req() req: Request, @Res({ passthrough: true }) res: Response){
        const user = req['user'];
        return await this.userActivityService.deleteUserActivity(id, user);
    }

}
