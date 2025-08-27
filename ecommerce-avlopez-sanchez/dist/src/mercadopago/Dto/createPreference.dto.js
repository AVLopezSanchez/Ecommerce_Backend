"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePreferenceDto = void 0;
const openapi = require("@nestjs/swagger");
class CreatePreferenceDto {
    title;
    quantity;
    unit_price;
    currency_id = 'ARS';
    description;
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, quantity: { required: true, type: () => Number }, unit_price: { required: true, type: () => Number }, currency_id: { required: true, type: () => String, default: "ARS" }, description: { required: false, type: () => String } };
    }
}
exports.CreatePreferenceDto = CreatePreferenceDto;
//# sourceMappingURL=createPreference.dto.js.map