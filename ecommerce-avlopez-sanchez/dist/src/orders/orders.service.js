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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const order_entity_1 = require("./entities/order.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/user.entity");
const product_entity_1 = require("../products/product.entity");
const orderDetails_entity_1 = require("../order-details/entities/orderDetails.entity");
let OrdersService = class OrdersService {
    ordersRepository;
    usersRepository;
    productsRepository;
    orderDetailsRepository;
    constructor(ordersRepository, usersRepository, productsRepository, orderDetailsRepository) {
        this.ordersRepository = ordersRepository;
        this.usersRepository = usersRepository;
        this.productsRepository = productsRepository;
        this.orderDetailsRepository = orderDetailsRepository;
    }
    async addOrder(dataOrder) {
        const user = await this.usersRepository.findOne({
            where: { id: dataOrder.userId },
        });
        if (!user)
            throw new common_1.NotFoundException('El usuario no existe');
        const newOrder = this.ordersRepository.create({
            date: new Date(),
            user: user,
        });
        await this.ordersRepository.save(newOrder);
        let totalPrice = 0;
        const productArr = await Promise.all(dataOrder.products.map(async (element) => {
            const product = await this.productsRepository.findOne({
                where: { id: element.id },
            });
            if (!product)
                throw new common_1.NotFoundException('Producto no encontrado');
            let quantity = element.quantity;
            if (quantity === undefined || quantity <= 0)
                throw new common_1.BadRequestException('Cantidad debe ser un numero positivo');
            if (product.stock < quantity)
                throw new common_1.BadRequestException('Producto no tiene stock');
            product.stock -= quantity;
            totalPrice += Number(product.price * quantity);
            quantity = 0;
            await this.productsRepository.save(product);
            return product;
        }));
        const newOrderDetail = this.orderDetailsRepository.create({
            price: Number(totalPrice.toFixed(2)),
            order_id: newOrder,
            products: productArr,
        });
        await this.orderDetailsRepository.save(newOrderDetail);
        return await this.ordersRepository.find({
            where: { id: newOrder.id },
            relations: {
                orderDetails: {
                    products: true,
                },
            },
        });
    }
    async getOrderById(id) {
        const order = await this.ordersRepository.findOneBy({ id });
        if (!order)
            throw new common_1.NotFoundException(`La orden con id: ${id} no existe`);
        return order;
    }
    async updateStatusOrder(orderId, status) {
        const order = await this.ordersRepository.findOne({
            where: { id: orderId },
        });
        if (!order)
            throw new common_1.NotFoundException(`La orden con id ${orderId} no existe`);
        order.status = status;
        await this.ordersRepository.save(order);
        return order;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(order_entity_1.Orders)),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_2.InjectRepository)(product_entity_1.Product)),
    __param(3, (0, typeorm_2.InjectRepository)(orderDetails_entity_1.OrderDetails)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map