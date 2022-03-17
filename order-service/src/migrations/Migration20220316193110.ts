import { Migration } from '@mikro-orm/migrations';

export class Migration20220316193110 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "order" ("id" serial primary key, "customer_id" int not null, "amount" int not null, "status" text check ("status" in (\'CREATED\', \'WAITING_PAYMENT\', \'PAYMENT_ACCEPTED\', \'PAYMENT_ERROR\', \'SHIPPED\', \'DELIVERED\', \'CANCELED\', \'COMPLETED\')) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "order" cascade;');
  }
}
