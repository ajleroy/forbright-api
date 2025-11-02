import { Test, TestingModule } from '@nestjs/testing';
import { DataPersistService } from './data-persist.service';

describe('DataPersistService', () => {
  let service: DataPersistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataPersistService],
    }).compile();

    service = module.get<DataPersistService>(DataPersistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
