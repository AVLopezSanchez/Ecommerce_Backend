import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { dataOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/Guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() dataOrder: dataOrderDto) {
    return this.ordersService.addOrder(dataOrder);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  getOrderById(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrderById(id);
  }
}
