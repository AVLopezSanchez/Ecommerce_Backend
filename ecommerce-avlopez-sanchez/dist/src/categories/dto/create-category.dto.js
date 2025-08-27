"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryDto = void 0;
const openapi = require("@nestjs/swagger");
class CategoryDto {
    name;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String } };
    }
}
exports.CategoryDto = CategoryDto;
//# sourceMappingURL=create-category.dto.js.map