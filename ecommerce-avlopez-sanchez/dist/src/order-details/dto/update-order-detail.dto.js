"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderDetailDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_order_detail_dto_1 = require("./create-order-detail.dto");
class UpdateOrderDetailDto extends (0, swagger_1.PartialType)(create_order_detail_dto_1.CreateOrderDetailDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateOrderDetailDto = UpdateOrderDetailDto;
//# sourceMappingURL=update-order-detail.dto.js.map