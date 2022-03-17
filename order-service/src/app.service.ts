import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  getServerStatus() {
    return 'Server ON';
  }
}
