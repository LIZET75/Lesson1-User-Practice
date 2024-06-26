import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class EmployeesService {
  private employees = [  
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
 

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if(role) { //vid427:21 defining msg when we search for other roles
        const rolesArray = this.employees.filter(user => user.role === role) // this will only return the users that have the role that was passed. 
        if(rolesArray.length ===0) throw new NotFoundException('User Role Not Found')  //no users w specified role found
            return rolesArray
    }
    return this.employees // If no role was passed, it returns all users.
}
findOne(id:number) {
  const user = this.employees.find(employee => employee.id === id)
  if(!user) throw new NotFoundException("User non existent")
  return user
}
  create(createEmployeeDto: CreateEmployeeDto) {
    const sortemployees = [...this.employees].sort((a,b) => b.id - a.id)
    const newEmployee = {
      id:sortemployees[0].id +1,
      ...createEmployeeDto
    }
    this.employees.push(newEmployee)
    return newEmployee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    this.employees = this.employees.map(employees => {
      if(employees.id === id) {
        return { ...employees, ...updateEmployeeDto}
      }
        return employees
    })
    return this.findOne(id)
  }

  remove(id: number) {{
    const removedUser = this.findOne(id)
    this.employees = this.employees.filter(user => user.id !==id)
    return removedUser
}
}
}
