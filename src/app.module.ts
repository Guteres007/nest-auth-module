import { Module } from '@nestjs/common'
import { AuthModule } from '@app/auth/auth.module'

@Module({
    imports: [
        AuthModule,
    ],
    exports: [
        AuthModule
    ]
})
export class AppModule {}
