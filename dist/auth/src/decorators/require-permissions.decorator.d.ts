import { Permission } from '@app/auth/enums/permission.enum';
export declare const PERMISSIONS_KEY = "require-permissions";
export declare const RequirePermissions: (...permissions: Permission[]) => import("@nestjs/common").CustomDecorator<string>;
