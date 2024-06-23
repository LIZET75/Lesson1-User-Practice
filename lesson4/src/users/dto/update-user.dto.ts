import { CreateUserDto } from "./create-user.dto";
import {PartialType } from "@nestjs/mapped-types"

export class UpdateUserDto extends PartialType(CreateUserDto) {}

//We don't need to apply any validator to updateDTO bc it is an extension of CreateUserDto vid4 19:44