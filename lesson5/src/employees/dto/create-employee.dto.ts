import {IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    @IsNotEmpty() //vid419:30 validating the name field
    name: string;

    @IsEmail() //vid 4 17:44 implementation of decorator
    email: string;

    @IsEnum(['INTERN' , 'ENGINEER' , 'ADMIN'], {message: 'Valid role required'}) //vid4 18:00, need to pass values, with a comma is going to be an array with the different role https://github.com/typestack/class-validator#validation-decorators 
    role: 'INTERN' | 'ENGINEER' | 'ADMIN'; 
} 
