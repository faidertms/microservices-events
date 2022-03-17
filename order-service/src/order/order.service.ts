import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async create({ customerId, amount }: CreateOrderDto): Promise<Order> {
    const order = new Order(customerId, amount);
    await this.orderRepository.persistAndFlush(order);
    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async findOne(id: number): Promise<Order> {
    return this.orderRepository.findOne(id);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepository.findOne(id);
    order.status = updateOrderDto.status;
    await this.orderRepository.flush();
    return order;
  }

  async remove(id: number) {
    return this.orderRepository.nativeDelete(id);
  }
}
