import { Module } from '@nestjs/common'
import { UserService } from '@app/user/user.service'
import { UserResolver } from '@app/user/user.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '@app/user/entities/user.entity'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService, MongooseModule],
})
export class UserModule {}
