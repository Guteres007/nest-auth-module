import { Module } from '@nestjs/common'
import { AuthModule } from '@app/auth/auth.module'
import { UserModule } from "@app/user/user.module";

@Module({
    imports: [
        AuthModule,
    ],
    exports: [
        AuthModule, UserModule
    ]
})
export class XYModule {}
