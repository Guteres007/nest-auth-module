"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirePermissions = exports.PERMISSIONS_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.PERMISSIONS_KEY = 'require-permissions';
const RequirePermissions = (...permissions) => {
    return (0, common_1.SetMetadata)(exports.PERMISSIONS_KEY, permissions);
};
exports.RequirePermissions = RequirePermissions;
//# sourceMappingURL=require-permissions.decorator.js.map