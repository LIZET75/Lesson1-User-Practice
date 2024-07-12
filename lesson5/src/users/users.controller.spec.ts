import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn(dto => {
      return {
        id:Date.now(),
        ...dto
      }
    }),
    update: jest.fn((id, dto) => ({
      id, 
      ...dto
    }))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).overrideProvider(UsersService)
    .useValue(mockUsersService)
    .compile();

  

    controller = module.get<UsersController>(UsersController);
  });

  it('should create a user', () => {
    expect(controller.create({name: 'Ervin Howel', email:'Leona@april.bix', role:'INTERN'})).toEqual({
      id: expect.any(Number),
      name: 'Ervin Howel',
      email: 'Leona@april.bix',
      role: 'INTERN'
    });
  });
  it('should update a user', () => {
    const dto: UpdateUserDto = {name:'YOLANDA', email:'MAYO@GMAIL.COM', role:'INTERN'}
    expect(controller.update(1, dto)).toEqual({
      id: expect.any(Number),
      ...dto
    })
  })
});
