"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiresAuth = RequiresAuth;
const common_1 = require("@nestjs/common");
const auth0_guard_1 = require("../auth/Guards/auth0.guard");
function RequiresAuth() {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(auth0_guard_1.Auth0Guard));
}
//# sourceMappingURL=auth.decorator.js.map