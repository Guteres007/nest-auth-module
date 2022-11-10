import { Injectable } from '@nestjs/common'
import { CreateUserInput } from '@app/user/dto/create-user.input'
import { UpdateUserInput } from '@app/user/dto/update-user.input'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from '@app/user/entities/user.entity'
import * as argon2 from 'argon2'

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { password, ...others } = createUserInput
    const hashedPassword = await argon2.hash(password)
    const userData = { ...others, password: hashedPassword }
    return await this.userModel.create(userData)
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({})
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id)
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.find({ email: email }).findOne().exec()
  }

  update(id: string, updateUserInput: UpdateUserInput) {}

  remove(id: string) {}
}
