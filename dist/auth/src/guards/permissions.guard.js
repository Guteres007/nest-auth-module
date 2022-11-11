"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const require_permissions_decorator_1 = require("../decorators/require-permissions.decorator");
const graphql_1 = require("@nestjs/graphql");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../../../user/src/user.service");
let PermissionsGuard = class PermissionsGuard {
    constructor(reflector, jwtService, userService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async canActivate(context) {
        const requiredPermissions = this.reflector.getAllAndOverride(require_permissions_decorator_1.PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredPermissions) {
            return true;
        }
        try {
            const ctx = graphql_1.GqlExecutionContext.create(context);
            const authHeader = ctx.getContext().req.headers.authorization;
            const jwt = authHeader.replace('Bearer ', '');
            const decoded = this.jwtService.decode(jwt);
            const user = await this.userService.findOne(decoded.sub);
            return requiredPermissions.some((permission) => { var _a; return (_a = user.permission) === null || _a === void 0 ? void 0 : _a.includes(permission); });
        }
        catch (error) {
            return false;
        }
    }
};
PermissionsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService,
        user_service_1.UserService])
], PermissionsGuard);
exports.PermissionsGuard = PermissionsGuard;
//# sourceMappingURL=permissions.guard.js.map