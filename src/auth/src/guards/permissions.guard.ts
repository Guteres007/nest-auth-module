import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Permission } from '@app/auth/enums/permission.enum'
import { PERMISSIONS_KEY } from '@app/auth/decorators/require-permissions.decorator'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '@app/user/user.service'

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    )

    if (!requiredPermissions) {
      return true
    }

    try {
      const ctx = GqlExecutionContext.create(context)
      const authHeader = ctx.getContext().req.headers.authorization
      const jwt = authHeader.replace('Bearer ', '')
      const decoded = this.jwtService.decode(jwt)
      const user = await this.userService.findOne(decoded.sub)
      return requiredPermissions.some((permission) =>
        user.permission?.includes(permission),
      )
    } catch (error) {
      return false
    }
  }
}
