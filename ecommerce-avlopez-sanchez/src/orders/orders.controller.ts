import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { dataOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { Status } from './status.enum';

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

  @ApiBearerAuth()
  @Put(':orderId')
  @UseGuards(AuthGuard)
  @ApiQuery({
    name: 'status',
    enum: Status,
    description: 'Nuevo estado de la orden',
    example: Status.approved,
  })
  updateStatusOrder(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Query('status') status: Status,
  ) {
    return this.ordersService.updateStatusOrder(orderId, status);
  }
}
