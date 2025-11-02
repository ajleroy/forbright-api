import { HttpService } from '@nestjs/axios/dist/http.service';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DataPersistService {

    private readonly logger = new Logger(DataPersistService.name);

    constructor(private readonly httpService: HttpService) { }

    async save(data: any): Promise<any> {
        this.logger.log('DataPersistService.save.');

        const url = 'https://dummy-s3-location.com/ingest';

        this.logger.log('DataPersistService.save :: using url: ${url} to send data.');

        try {
            this.logger.log('DataPersistService.save :: attempting to send object to S3 endpoint.');
            const response = await firstValueFrom(
                this.httpService.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            );
            this.logger.log('DataPersistService.save :: response received from S3 endpoint.');
            return response.data;
        } catch (error) {
            this.logger.error('DataPersistService.save :: error encountered: {error.message}.');
            throw error;
        }
    }
}