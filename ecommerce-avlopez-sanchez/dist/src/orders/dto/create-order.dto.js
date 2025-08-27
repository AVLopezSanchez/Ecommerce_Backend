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
exports.dataOrderDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const status_enum_1 = require("../status.enum");
class dataOrderDto {
    userId;
    status;
    products;
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => String, format: "uuid" }, status: { required: true, enum: require("../status.enum").Status }, products: { required: true, type: () => [Object], minItems: 1 } };
    }
}
exports.dataOrderDto = dataOrderDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], dataOrderDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", String)
], dataOrderDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array de objetos con ID de productos',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                    example: 1111111111111,
                },
                quantity: {
                    type: 'number',
                    example: 4,
                },
            },
        },
        example: [
            { id: 1111111111111, quantity: 3 },
            { id: 2222222222222, quantity: 2 },
        ],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], dataOrderDto.prototype, "products", void 0);
//# sourceMappingURL=create-order.dto.js.map