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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
const category_entity_1 = require("../categories/entities/category.entity");
const dataInicial_1 = require("../dataInicial");
const categories_service_1 = require("../categories/categories.service");
let ProductsService = class ProductsService {
    productsRepository;
    categoriesRepository;
    categoriesService;
    constructor(productsRepository, categoriesRepository, categoriesService) {
        this.productsRepository = productsRepository;
        this.categoriesRepository = categoriesRepository;
        this.categoriesService = categoriesService;
    }
    async onModuleInit() {
        try {
            await this.categoriesService.ensureCategoriesLoaded();
            const productsFound = await this.productsRepository.find();
            if (productsFound.length === 0) {
                await this.addProduct();
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async addProduct() {
        const productsFound = await this.productsRepository.find();
        if (productsFound.length > 0)
            throw new common_1.BadRequestException('Productos cargados previamente');
        const arrayData = dataInicial_1.dataIncial;
        const products = arrayData.map(async (element) => {
            const category = await this.categoriesRepository.findOne({
                where: { name: element.category },
            });
            if (!category)
                throw new common_1.NotFoundException('no se encontro la categoria');
            const product = this.productsRepository.create({
                name: element.name,
                description: element.description,
                price: element.price,
                stock: element.stock,
                category_id: category,
            });
            await this.productsRepository.save(product);
            return product;
        });
        return Promise.all(products);
    }
    async getProducts(page, limit) {
        let products = await this.productsRepository.find({
            relations: {
                category_id: true,
            },
        });
        const start = (page - 1) * limit;
        const finish = start + limit;
        products = products.slice(start, finish);
        return products;
    }
    async addProductForm(data) {
        const productFound = await this.productsRepository.findOne({
            where: { name: data.name },
        });
        if (productFound)
            throw new common_1.BadRequestException(`Producto ${data.name} ya existe`);
        const categoryFound = await this.categoriesRepository.findOne({
            where: { name: data.category },
        });
        if (!categoryFound)
            throw new common_1.NotFoundException(`No existe la categoria ${data.category}`);
        if (!productFound) {
            const newProduct = this.productsRepository.create({
                name: data.name,
                price: data.price,
                stock: data.stock,
                description: data.description,
                category_id: categoryFound,
            });
            await this.productsRepository.save(newProduct);
            return newProduct;
        }
    }
    async addOneProductStock(productId) {
        const product = await this.productsRepository.findOne({
            where: { id: productId },
        });
        if (!product)
            throw new common_1.NotFoundException(`El product con id ${product} no existe`);
        product.stock += 1;
        await this.productsRepository.save(product);
        return product;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Categories)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        categories_service_1.CategoriesService])
], ProductsService);
//# sourceMappingURL=products.service.js.map