import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../../user/src/user.service';
export declare class PermissionsGuard implements CanActivate {
    private reflector;
    private jwtService;
    private userService;
    constructor(reflector: Reflector, jwtService: JwtService, userService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
