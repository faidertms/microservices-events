import { Test, TestingModule } from '@nestjs/testing';
import { OrderStatus } from './order.entity';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { Chance } from 'chance';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrderService', () => {
  var chance = new Chance();
  let service: OrderService;
  let orderRepository: OrderRepository;

  const mockOrderRepository = {
    findAll: jest.fn().mockImplementation(() => {
      return Promise.resolve([]);
    }),
    findOne: jest.fn().mockImplementation((id) => {
      return Promise.resolve({
        id: id ?? chance.integer(),
        customerId: chance.integer(),
        amount: chance.integer(),
        status: OrderStatus.CREATED,
        createdAt: chance.date(),
        updatedAt: chance.date(),
      });
    }),
    flush: jest.fn().mockResolvedValue(1),
    persistAndFlush: jest.fn().mockImplementation((dto: CreateOrderDto) => {
      return Promise.resolve({
        ...dto,
      });
    }),
    nativeDelete: jest.fn().mockImplementation((id: string) => {
      return 1;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: OrderRepository,
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get<OrderRepository>(OrderRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });

    it('should return all orders', async () => {
      expect(await service.findAll()).toStrictEqual([]);
      expect(orderRepository.findAll).toBeCalled();
    });
  });

  describe('#findOne', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

    it('should return an order', async () => {
      const id = chance.integer();
      expect(await service.findOne(id)).toHaveProperty('id', id);
      expect(orderRepository.findOne).toBeCalledWith(id);
    });
  });

  describe('#remove', () => {
    it('should be defined', () => {
      expect(service.remove).toBeDefined();
    });

    it('should remove an order', async () => {
      const id = chance.integer();
      expect(await service.remove(id)).toEqual(1);
      expect(orderRepository.nativeDelete).toBeCalledWith(id);
    });
  });

  describe('#create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should create an order', async () => {
      const dto = {
        customerId: chance.integer(),
        amount: chance.integer(),
      };
      expect(await service.create(dto)).toMatchObject(dto);
      expect(orderRepository.persistAndFlush).toBeCalled();
    });
  });

  describe('#update', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should update an order', async () => {
      const id = chance.integer();
      const dto = {
        status: OrderStatus.COMPLETED,
      };

      const result = await service.update(id, dto);

      expect(orderRepository.flush).toBeCalled();
      expect(result.id).toEqual(id);
      expect(result.status).toEqual(dto.status);
    });
  });
});
