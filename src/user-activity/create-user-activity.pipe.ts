import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class CreateUserActivityPipe implements PipeTransform {
  private validationMessages: { [key: string]: string };

  constructor(){
    const jsonFile = fs.readFileSync('languages/en.json', 'utf-8');
    this.validationMessages = JSON.parse(jsonFile);
  }

  transform(value: any) {
    this.isValid(value)
    
    return value;
  }

  private isValid(value: any): boolean {
    
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    if (!value.activity_start) {
      throw new BadRequestException(this.validationMessages.user_activity['activityStartIsRequired']);
    }

    if (!value.activity_end) {
      throw new BadRequestException(this.validationMessages.user_activity['activityEndIsRequired']);
    }

    if (!value.activity) {
      throw new BadRequestException(this.validationMessages.user_activity['activityIsRequired']);
    }

    return true;
  }
}
