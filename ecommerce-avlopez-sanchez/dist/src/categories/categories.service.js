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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("./entities/category.entity");
const typeorm_2 = require("typeorm");
const dataInicial_1 = require("../dataInicial");
let CategoriesService = class CategoriesService {
    categoriesRepository;
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async ensureCategoriesLoaded() {
        const categoriesFound = await this.categoriesRepository.find();
        if (categoriesFound.length === 0) {
            await this.addCategories();
        }
    }
    async onModuleInit() {
        const categoriesFound = await this.categoriesRepository.find();
        if (categoriesFound.length === 0) {
            await this.addCategories();
        }
    }
    async addCategories() {
        const categoriesFound = await this.categoriesRepository.find();
        if (categoriesFound.length > 0)
            throw new common_1.BadRequestException('Categorias cargadas previamente');
        const arrayDatos = dataInicial_1.dataIncial;
        const uniqueCategories = [
            ...new Set(arrayDatos.map((element) => element.category)),
        ];
        const categories = uniqueCategories.map((categoryName) => this.categoriesRepository.create({ name: categoryName }));
        await this.categoriesRepository.upsert(categories, ['name']);
        return 'Se han cargado todas las categorias';
    }
    async getCategories() {
        const categories = await this.categoriesRepository.find();
        return categories;
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Categories)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map