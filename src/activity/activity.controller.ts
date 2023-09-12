import { Body, Controller, Delete, Param, Post, Put, Req, Res } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';

@Controller('activity')
export class ActivityController {
    constructor(private readonly activityService: ActivityService) { }

    @Post('create')
    async create(@Body() createActivityDto: CreateActivityDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const activity = await this.activityService.createActivity(createActivityDto);
        return activity
    }

    @Put('change/:id')
    async change(@Body() createActivityDto: CreateActivityDto, @Param('id') id: number, @Req() req: Request, @Res({ passthrough: true }) res: Response) {        
        const activity = await this.activityService.changeActivity(createActivityDto, id);
        return activity
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string, @Req() req: Request, @Res({ passthrough: true }) res: Response) { 
        const activity = await this.activityService.deleteActivity(parseInt(id));
        return activity
    }
}
