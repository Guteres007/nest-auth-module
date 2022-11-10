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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("@app/user/user.service");
const jwt_1 = require("@nestjs/jwt");
const auth_config_1 = require("@app/auth/auth.config");
const argon2 = require("argon2");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            throw new common_1.BadRequestException({
                message: "User with this email doesn't exist.",
            });
        }
        if (!(await argon2.verify(user.password, password))) {
            throw new common_1.BadRequestException({
                message: 'Wrong password.',
            });
        }
        user.password = undefined;
        return user;
    }
    async createToken(user) {
        const payload = {
            name: user.name,
            sub: user._id,
            permission: user.permission,
        };
        return {
            accessToken: this.jwtService.sign(payload, {
                expiresIn: auth_config_1.jwtConstants.expiresIn,
                secret: auth_config_1.jwtConstants.secret,
            }),
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map