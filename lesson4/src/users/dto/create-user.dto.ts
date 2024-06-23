import {IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"; //vid4 17:32

export class CreateUserDto {
    @IsString()
    @IsNotEmpty() //vid419:30 validating the name field
    name: string;

    @IsEmail() //vid 4 17:44 implementation of decorator
    email: string;

    @IsEnum(['INTERN' , 'ENGINEER' , 'ADMIN'], {message: 'Valid role required'}) //vid4 18:00, need to pass values, with a comma is going to be an array with the different role https://github.com/typestack/class-validator#validation-decorators 
    role: 'INTERN' | 'ENGINEER' | 'ADMIN'; 
}

//We don't need to apply any validator to updateDTO bc it is an extension of CreateUserDto vid4 19:44
//To complete the enforcing, need to apply the Pipe