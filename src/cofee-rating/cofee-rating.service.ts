import { Injectable } from '@nestjs/common';
import { CoffeesService } from 'src/coffees/coffees.service';

@Injectable()
export class CofeeRatingService {
  constructor(private readonly coffeesService: CoffeesService) {}
}
