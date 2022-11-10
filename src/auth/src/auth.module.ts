import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { User, UserSchema } from '@app/user/entities/user.entity'
import { MongooseModule } from '@nestjs/mongoose'
import { UserService } from '@app/user/user.service'
import { AuthResolver } from './auth.resolver'
import { PassportModule } from '@nestjs/passport'
import { jwtConstants } from '@app/auth/auth.config'
import { APP_GUARD } from '@nestjs/core'
import { PermissionsGuard } from '@app/auth/guards/permissions.guard'
import { UserModule } from '@app/user'

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '120m' },
        }
      },
    }),
    PassportModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    AuthService,
    JwtService,
    UserService,
    JwtStrategy,
    AuthResolver,
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
  exports: [JwtModule, UserModule],
})
export class AuthModule {}
