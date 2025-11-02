import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DataPersistService } from './data-persist.service';

@Module({
    imports: [HttpModule],
    providers: [DataPersistService],
    exports: [DataPersistService]
})
export class DataPersistModule { }
