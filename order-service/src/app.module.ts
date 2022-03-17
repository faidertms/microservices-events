import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/core';
@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    OrderModule,
    ConfigModule.forRoot({
      load: [databaseConfig, appConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    const migrator = this.orm.getMigrator();
    await migrator.createMigration();
    await migrator.up();
  }
}
