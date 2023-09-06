import { Controller, Post } from '@nestjs/common';
import { TokensService } from './tokens.service';

@Controller('tokens')
export class TokensController {
    constructor(private readonly tokenService: TokensService){}

    @Post()
    create () {
        const asd =  this.tokenService.generateToken({first_name:'artem.kuskin7@gmail.com', last_name: "asdasda", password: 'asdasda', email:'dasdasadsds'} )
        console.log(asd);
        
    }

    @Post("save") 
     async save() {
       await  this.tokenService.saveToken(8, 'a.dsadsda.f')
    }
}
