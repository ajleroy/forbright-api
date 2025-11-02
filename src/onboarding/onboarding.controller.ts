import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApplicantDto } from './dto/applicant.dto';
import { OnboardingService } from './onboarding.service';

@Controller('onboarding')
export class OnboardingController {

    private readonly logger = new Logger(OnboardingController.name);

    constructor(private readonly onboardingService: OnboardingService) { }

    @Post()
    async saveApplicant(@Body() applicant: ApplicantDto) {
        this.logger.log('OnboardingController.saveApplicant.');

        this.logger.log('OnboardingController.saveApplicant :: send applicant to the onboardingService.');

        const result = await this.onboardingService.saveApplicant(applicant);

        this.logger.log('OnboardingController.saveApplicant :: onboardingService save completed :: result: ${result}.');

        return { status: result };
    }
}