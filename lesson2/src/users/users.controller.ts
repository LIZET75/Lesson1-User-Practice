import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users') //users
export class UsersController {
    /* Plan the routes
    GET /users
    GET /uses/:id
    POST /users
    PATCH /users
    DELETE /users/id
    */
    //GET /users or /users?role=value.. localhost:3000/users & localhost:3000/users?role=ADMIN
    @Get()  
    findAll(@Query('role') role?:'INTERN' | 'ENGINEER' | 'ADMIN') { //The @Query is for /users?role=value. Define role as optional w ? and several possible values 'INTERN' | 'ENGINEER' | 'ADMIN'
        return [] // returns an array of all the users
    } 
    
    //GET /uses/:id
    @Get(':id') //GET /users  :id is a param in the URL
    findOne(@Param('id') id:string) { //@Param is going to identify id as it comes in & provide type. All params are strings
        return { id } // return the id in the body of the thunderclient
    }
    //NOTE***  This route needs to be above :id or it will assign Id to interns. *** Below is what it returns which is wrong!
    //{
    // "id": "interns"
    //}
    @Get('interns') // GET users/intern. 
    findAllInterns() {
        return []        
    }
    //POST /users
    @Post() 
    create(@Body() user:{})  { //@Body data to create for the user & read the body of the request. Type of body user : emptty object
        return user
    }  
    //PATCH /users
    @Patch(':id') //PATCH /users  :id is a param in the URL
    update(@Param('id') id:string, @Body() userUpdate:{} ) { //@Param is going to identify id as it comes in & provide type. @Body to make the changes
        return { id, ...userUpdate} // return the id in the body plus the spread of whatever data we get for the userUpdate
    }
    //DELETE /users/id
    @Delete(':id') //DELETE /users  :id is a param in the URL
    delete(@Param('id') id:string,   ) { //@Param is going to identify id as it comes in & provide type.  
        return { id } // return the id in the body plus the spread of whatever data we get for the userUpdate
    }
}
