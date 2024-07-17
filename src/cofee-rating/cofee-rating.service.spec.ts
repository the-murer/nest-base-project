import { Test, TestingModule } from '@nestjs/testing';
import { CofeeRatingService } from './cofee-rating.service';

describe('CofeeRatingService', () => {
  let service: CofeeRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CofeeRatingService],
    }).compile();

    service = module.get<CofeeRatingService>(CofeeRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
