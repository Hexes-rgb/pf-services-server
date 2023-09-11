import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class RegistrationPipe implements PipeTransform {
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

    if (!value.email || typeof value.email !== 'string' || !this.isValidEmail(value.email)) {
      throw new BadRequestException(this.validationMessages.auth['invalidEmail']);
    }

    if (!value.password || typeof value.password !== 'string' || value.password.length < 6 || value.password.length > 20) {
      throw new BadRequestException(this.validationMessages.auth['invalidPassword']);
    }

    return true;
  }

  private isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
}
