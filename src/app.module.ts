import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OnboardingModule } from './onboarding/onboarding.module';
import { DataPersistService } from './data-persist/data-persist.service';
import { DataPersistModule } from './data-persist/data-persist.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Applicant } from './onboarding/dal/entities/applicant.entity';

@Module({
  imports: [
    OnboardingModule,
    DataPersistModule,
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ajleroy',
      password: '',
      database: 'S3_forbright',
      entities: [Applicant],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService, DataPersistService],
})
export class AppModule { }
