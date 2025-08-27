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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const upload_image_repository_1 = require("./upload-image.repository");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../products/product.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
let FileUploadService = class FileUploadService {
    productsRepository;
    fileUploadRepository;
    userRepository;
    constructor(productsRepository, fileUploadRepository, userRepository) {
        this.productsRepository = productsRepository;
        this.fileUploadRepository = fileUploadRepository;
        this.userRepository = userRepository;
    }
    async uploadImage(file, productId) {
        const product = await this.productsRepository.findOneBy({ id: productId });
        if (!product)
            throw new common_1.NotFoundException('No se encontro el producto');
        const uploadResponse = await this.fileUploadRepository.uplaodImage(file);
        product.imgUrl = uploadResponse.secure_url;
        const updateProduct = await this.productsRepository.save(product);
        return updateProduct;
    }
    async uploadPerfilImage(file, userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user)
            throw new common_1.NotFoundException(`El usuario con id ${userId} no existe`);
        const uploadResponse = await this.fileUploadRepository.uplaodImage(file);
        user.perfilImg = uploadResponse.url;
        const updateUser = await this.userRepository.save(user);
        return updateUser;
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        upload_image_repository_1.FileUploadRepository,
        typeorm_2.Repository])
], FileUploadService);
//# sourceMappingURL=upload-image.service.js.map