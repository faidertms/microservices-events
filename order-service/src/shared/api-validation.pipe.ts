import {
  Injectable,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { Errors } from './errors.enum';

@Injectable()
export class ApiValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors) =>
        new BadRequestException({
          code: Errors.VALIDATION_FAILED,
          message: 'Validation failed',
          details: errors,
        }),
    });
  }
}
