import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { ParkingModule } from './parking/parking.module';

@Module({
  imports: [DbModule, ParkingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
