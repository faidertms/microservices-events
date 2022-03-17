import {
  Entity,
  EntityRepositoryType,
  Enum,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { OrderRepository } from './order.repository';

export enum OrderStatus {
  CREATED = 'CREATED',
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  PAYMENT_ACCEPTED = 'PAYMENT_ACCEPTED',
  PAYMENT_ERROR = 'PAYMENT_ERROR',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELED',
  COMPLETED = 'COMPLETED',
}

@Entity({ customRepository: () => OrderRepository })
export class Order {
  [EntityRepositoryType]?: OrderRepository;

  @PrimaryKey()
  id: number;

  @Property()
  customerId: number;

  @Property()
  amount: number;

  @Enum(() => OrderStatus)
  status: string = OrderStatus.CREATED;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(customerId: number, amount: number) {
    this.customerId = customerId;
    this.amount = amount;
  }
}
