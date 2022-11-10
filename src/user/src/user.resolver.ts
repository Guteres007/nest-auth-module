import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserService } from '@app/user/user.service'
import { User } from '@app/user/entities/user.entity'
import { CreateUserInput } from '@app/user/dto/create-user.input'
import { UpdateUserInput } from '@app/user/dto/update-user.input'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard'
import { RequirePermissions } from '@app/auth/decorators/require-permissions.decorator'
import { Permission } from '@app/auth/enums/permission.enum'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createAuthInput: CreateUserInput) {
    return this.userService.create(createAuthInput)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [User], { name: 'users' })
  findAll() {

    return this.userService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @RequirePermissions(Permission.ALL)
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id)
  }

  @Mutation(() => User)
  updateAuth(@Args('updateUserInput') updateAuthInput: UpdateUserInput) {
    return this.userService.update(updateAuthInput.id, updateAuthInput)
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: string) {
    return this.userService.remove(id)
  }
}
