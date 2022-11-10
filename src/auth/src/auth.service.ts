import { BadRequestException, Injectable } from '@nestjs/common'
import { UserService } from '@app/user/user.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '@app/user/entities/user.entity'
import { jwtConstants } from '@app/auth/auth.config'
import * as argon2 from 'argon2'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.userService.findOneByEmail(email)

    if (!user) {
      throw new BadRequestException({
        message: "User with this email doesn't exist.",
      })
    }

    if (!(await argon2.verify(user.password, password))) {
      throw new BadRequestException({
        message: 'Wrong password.',
      })
    }

    user.password = undefined
    return user
  }

  async createToken(user: User) {
    const payload = {
      name: user.name,
      sub: user._id,
      permission: user.permission,
    }
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: jwtConstants.expiresIn,
        secret: jwtConstants.secret,
      }),
    }
  }
}
