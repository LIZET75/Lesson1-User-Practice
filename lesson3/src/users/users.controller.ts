import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') //users
export class UsersController {
    
    constructor (private readonly usersService: UsersService) {} // injecting ther UsersService 
    //need to update routes instead of return [] --> this.usersService(method created in service) 

    /*
    @Get
    findAll(@Query('role') role?:'INTERN' | 'ENGINEER' | 'ADMIN')
    findOne(@Param('id') id:string)
    @Post
    create(@Body() user:{}) 
    @Patch
    update(@Param('id') id:string, @Body() userUpdate:{})
    @Delete
     delete(@Param('id') id:string)

    */

    //GET /users or /users?role=value.. localhost:3000/users & localhost:3000/users?role=ADMIN
    @Get()  
    findAll(@Query('role') role?:'INTERN' | 'ENGINEER' | 'ADMIN') { 
        
        return this.usersService.findAll(role) //passing role if it was received
    } 
    
    //GET /uses/:id
    @Get(':id') //GET /users  :id is a param in the URL
    findOne(@Param('id') id:string) { 
        return this.usersService.findOne(+id) // we're receiving id as string, needs to be converted to num
    }
     
    //POST /users
    @Post() 
    create(@Body() user:{name:string, email:string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'})  {  
        return this.usersService.create(user)
    }  
    //PATCH /users
    @Patch(':id') //PATCH /users  :id is a param in the URL
    update(@Param('id') id:string, @Body() userUpdate:{name?:string, email?:string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN'} ) {  
        return this.usersService.update(+id, userUpdate) 
    }
    //DELETE /users/id
    @Delete(':id') //DELETE /users  :id is a param in the URL
    delete(@Param('id') id:string) { 
        return this.usersService.delete(+id)
    }
}
