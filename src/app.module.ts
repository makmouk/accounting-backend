import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { InvoicesModule } from './invoices/invoices.module';
import { PurchasesModule } from './purchases/purchases.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    ClientsModule,
    ItemsModule,
    MongooseModule.forRoot('mongodb://localhost/accounting-online'),
    InvoicesModule,
    PurchasesModule,
    SuppliersModule,
    OffersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
