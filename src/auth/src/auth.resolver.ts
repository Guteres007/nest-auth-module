import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from '@app/auth/auth.service'
import { AuthResponse } from '@app/auth/dto/auth-response'
import { Inject } from '@nestjs/common'

Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(@Inject(AuthService) protected authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user = await this.authService.validateUser(email, password)
    return await this.authService.createToken(user)
  }
}
