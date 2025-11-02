import { Module } from '@nestjs/common';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';
import { DataPersistModule } from 'src/data-persist/data-persist.module';
import { Repository } from 'typeorm';
import { Applicant } from './dal/entities/applicant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DataPersistModule, TypeOrmModule.forFeature([Applicant])],
  controllers: [OnboardingController],
  providers: [OnboardingService]
})
export class OnboardingModule { }
