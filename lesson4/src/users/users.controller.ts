import { Body, Controller, Delete, Get, Param, Patch, Post, Query , ParseIntPipe, ValidationPipe} from '@nestjs/common'; //vid4 20:13 importing validationpipe
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto'; //Video 4 12:16
import { UpdateUserDto } from './dto/update-user.dto';//Video 4 12:16

@Controller('users') //users
export class UsersController {
    
    constructor (private readonly usersService: UsersService) {} // injecting ther UsersService 
    //need to update routes instead of return [] --> this.usersService(method created in service) 

  

    //GET /users or /users?role=value.. localhost:3000/users & localhost:3000/users?role=ADMIN
    @Get()  
    findAll(@Query('role') role?:'INTERN' | 'ENGINEER' | 'ADMIN') { 
        
        return this.usersService.findAll(role) //passing role if it was received
    } 
    
    //GET /uses/:id
    @Get(':id') //GET /users  :id is a param in the URL
    findOne(@Param('id', ParseIntPipe  ) id:number) {  // ParseIntPipe to turn the +id into regular id & change Id: string to number 3:49 Video4
        return this.usersService.findOne(id) //  
        /*The ParseIntPipe validates the data and does not allow strings as id numbers in the URL
        localhost:3000/users/aa
        {
            "message": "Cannot POST /users/aa",
            "error": "Not Found",
            "statusCode": 404
          }*/
    }
     
    //POST /users
    @Post() //validationPipe goes inside @Body(), this vill validate against the DTO
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {  //VID 4 12:34 patter is to replace user with CreateuserDto (lowercase)
        return this.usersService.create(createUserDto) //Video4 12:23 deleting the name, email and role and replacing with DTO
    }  
    //PATCH /users
    @Patch(':id') //PATCH /users  :id is a param in the URL
    update(@Param('id', ParseIntPipe) id:number, @Body(ValidationPipe) updateUserDto:UpdateUserDto ) {  //Video4 13:12 replace properties w/  UpdateUserDto 
        return this.usersService.update(id, updateUserDto) // ParseIntPipe to turn the +id into regular id & change Id: string to number 4:17 Video4
    /*  the ParseInt Pipe validates vid 4 5:31
    does not allow strings in the url localhost:3000/users/aa
    {
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request",
  "statusCode": 400
}*/
    }
    //DELETE /users/id
    @Delete(':id') //DELETE /users  :id is a param in the URL
    delete(@Param('id', ParseIntPipe) id:number) {  // ParseIntPipe to turn the +id into regular id & change Id: string to number 4:25 Video4
        return this.usersService.delete(id)
    }
    /*  the ParseInt Pipe validates vid 4 5:31 does not allow strings in the url localhost:3000/users/aa
    {
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request",
  "statusCode": 400
}*/
}
