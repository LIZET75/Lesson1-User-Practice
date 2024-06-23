import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [ // this is a property
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
        if(role) {
            return this.users.filter(user => user.role === role) // this will only return the users that have the role that was passed.   
        }
        return this.users // If no role was passed, it returns all users.
    }
    findOne(id:number) {
        const user = this.users.find(user => user.id === id)

        return user
    }
    create(user: {name:string, email:string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}) { //specify what it is in the user object
      const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id) // generate the logic to create an id
      const newUser = {
        id:usersByHighestId[0].id +1,  //take the first element of the newly sorted array of users 
        ...user // this will create the new id above line + add the user object
      }
      this.users.push(newUser)
      return newUser;
    }
    update(id:number, updatedUser:{name?:string, email?:string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN'}) { //we don't need to update all, they may be optional
        this.users = this.users.map(user => {
            if(user.id === id ) {
                return { ...user, ...updatedUser} //spread all the properties of existing user and the updatedUser
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
