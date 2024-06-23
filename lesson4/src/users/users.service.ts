import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto'; //video4 13:39
import { UpdateUserDto } from './dto/update-user.dto'; //video4 13:39
import { NotFoundException } from '@nestjs/common';// vid4 25:11


@Injectable()
export class UsersService {
    private users = [  
        {
            "id": 1,
            "name": "Leanne Graham",
            "email": "Sincere@april.biz",
            "role": "INTERN"
        },
        {
            "id": 2,
            "name": "Ervin Howel",
            "email": "Leona@april.biz",
            "role": "INTERN"
        },
        {
            "id": 3,
            "name": "Clementine Graham",
            "email": "Clementine@april.biz",
            "role": "Engineer"
        },
        {
            "id": 4,
            "name": "Yolanda Morales",
            "email": "Yolanda@april.biz",
            "role": "ADMIN"
        },
        {
            "id": 5,
            "name": "Roxxane Bottle",
            "email": "Roxxane@april.biz",
            "role": "INTERN"
        }
    ]
//Create methods
    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if(role) { //vid427:21 defining msg when we search for other roles
            const rolesArray = this.users.filter(user => user.role === role) // this will only return the users that have the role that was passed. 
            if(rolesArray.length ===0) throw new NotFoundException('User Role Not Found')  //no users w specified role found
                return rolesArray
        }
        return this.users // If no role was passed, it returns all users.
    }
    findOne(id:number) {
        const user = this.users.find(user => user.id === id)
        if(!user) throw new NotFoundException("User non existent")
        return user
    }
    create(user: CreateUserDto) { //Vid414:05 replacing object w DTO
      const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id) // generate the logic to create an id
      const newUser = {
        id:usersByHighestId[0].id +1,  //take the first element of the newly sorted array of users 
        ...user // vid4replace the createUserdto
      }
      this.users.push(newUser)
      return newUser;
    }
    update(id:number, updateUserDto:UpdateUserDto) { //vid414:38
        this.users = this.users.map(user => {
            if(user.id === id ) {
                return { ...user, ...updateUserDto} //vid4 update the pattern updateUserDto (lowercase)
        }
            return user
    })
        return this.findOne(id)
    }
    delete(id: number) {
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !==id)
        return removedUser
    }
}
