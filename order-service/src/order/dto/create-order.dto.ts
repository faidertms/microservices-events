import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsInt()
  @IsPositive()
  customerId: number;
}
