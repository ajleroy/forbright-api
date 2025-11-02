import { Injectable, Logger } from '@nestjs/common';
import { ApplicantDto } from './dto/applicant.dto';
import { DataPersistService } from 'src/data-persist/data-persist.service';
import { Applicant } from './dal/entities/applicant.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Like, Repository } from 'typeorm';

@Injectable()
export class OnboardingService {

    private readonly logger = new Logger(OnboardingService.name);

    constructor(
        private readonly dataPersistService: DataPersistService,
        @InjectRepository(Applicant) private readonly applicantRepository: Repository<Applicant>
    ) { }

    async saveApplicant(applicant: ApplicantDto): Promise<any> {
        this.logger.log('OnboardingService.saveApplicant.');

        this.logger.log('OnboardingService.saveApplicant :: send applicant to the dataPersistService.');

        return await this.dataPersistService.save(applicant);
    }

    async getMostRecentApplicants(limit: number): Promise<Applicant[]> {
        this.logger.log('OnboardingService.getMostRecentApplicants.');

        return this.applicantRepository.find({
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }

    async getApplicantsUsingGmail(): Promise<Applicant[]> {
        this.logger.log('OnboardingService.getApplicantsUsingGmail.');

        return this.applicantRepository.find({
            where: { emailAddress: Like('%@gmail.com') }
        });
    }

    async getApplicantsWithFirstNameStartsWithA(): Promise<Applicant[]> {
        this.logger.log('OnboardingService.getApplicantsWithFirstNameStartsWithA.');

        return this.applicantRepository.find({
            where: { firstName: Like('A%') }
        });
    }

    async getNumberOfApplicantsCreatedByMonthLatestYear() {
        this.logger.log('OnboardingService.getNumberOfApplicantsCreatedByMonthLatestYear.');

        return this.applicantRepository
            .createQueryBuilder('applicant')
            .select("TO_CHAR(applicant.createdAt, 'YYYY-MM')", 'month')
            .addSelect('COUNT(*)', 'count')
            .where("EXTRACT(YEAR FROM applicant.createdAt) = :year", { year: 2025 })
            .groupBy("TO_CHAR(applicant.createdAt, 'YYYY-MM')")
            .orderBy('month', 'ASC')
            .getRawMany();
    }

    async getEmailAddressesThatAreDuplicated(): Promise<string[]> {
        this.logger.log('OnboardingService.getEmailAddressesThatAreDuplicated.');

        const duplicateEmailQuery = await this.applicantRepository
            .createQueryBuilder('applicant')
            .select('applicant.emailAddress')
            .addSelect('COUNT(applicant.emailAddress)', 'count')
            .groupBy('applicant.emailAddress')
            .having('COUNT(applicant.emailAddress) > 1')
            .getRawMany();

        return duplicateEmailQuery.map((row) => row.user_email);
    }
}