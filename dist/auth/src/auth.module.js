"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./jwt.strategy");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("@app/user/entities/user.entity");
const mongoose_1 = require("@nestjs/mongoose");
const user_service_1 = require("@app/user/user.service");
const auth_resolver_1 = require("./auth.resolver");
const passport_1 = require("@nestjs/passport");
const auth_config_1 = require("@app/auth/auth.config");
const core_1 = require("@nestjs/core");
const permissions_guard_1 = require("@app/auth/guards/permissions.guard");
const user_module_1 = require("@app/user/user.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            jwt_1.JwtModule.registerAsync({
                useFactory: () => {
                    return {
                        secret: auth_config_1.jwtConstants.secret,
                        signOptions: { expiresIn: '120m' },
                    };
                },
            }),
            passport_1.PassportModule,
            mongoose_1.MongooseModule.forFeature([{ name: user_entity_1.User.name, schema: user_entity_1.UserSchema }]),
        ],
        providers: [
            auth_service_1.AuthService,
            jwt_1.JwtService,
            user_service_1.UserService,
            jwt_strategy_1.JwtStrategy,
            auth_resolver_1.AuthResolver,
            {
                provide: core_1.APP_GUARD,
                useClass: permissions_guard_1.PermissionsGuard,
            },
        ],
        exports: [jwt_1.JwtModule, user_module_1.UserModule],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map