import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class LoginPipe implements PipeTransform {
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

    if (!value.email) {
      throw new BadRequestException(this.validationMessages.auth['emailRequired']);
    }

    if (!value.password) {
      throw new BadRequestException(this.validationMessages.auth['passwordRequired']);
    }

    return true;
  }
}
