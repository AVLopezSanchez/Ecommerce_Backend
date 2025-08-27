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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../users/user.entity");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    userRepository;
    jwtService;
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async registerUser(user) {
        const userFound = await this.userRepository.findOne({
            where: { email: user.email },
        });
        if (userFound)
            throw new common_1.BadRequestException('Usuario registrado anteriormente');
        if (user.password !== user.password2)
            throw new common_1.BadRequestException('Ambas constraseñas deben ser iguales');
        const hashPassword = await bcrypt.hash(user.password, 10);
        const newUser = await this.userRepository.save({
            name: user.name,
            email: user.email,
            password: hashPassword,
            phone: user.phone,
            address: user.address,
            country: user.country,
            city: user.city,
        });
        return newUser;
    }
    async loginUser(credentials) {
        const userFound = await this.userRepository.findOne({
            where: { email: credentials.email },
        });
        if (!userFound)
            throw new common_1.BadRequestException('Usuario o contraseña invalido');
        const passwordCompare = await bcrypt.compare(credentials.password, userFound.password);
        if (!passwordCompare)
            throw new common_1.BadRequestException('Usuario o contraseña invalido');
        const payload = {
            id: userFound.id,
            email: userFound.email,
            isAdmin: userFound.isAdmin,
        };
        const token = this.jwtService.sign(payload);
        return token;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map