import { Module } from '@nestjs/common';
import { CofeeRatingService } from 'src/cofee-rating/cofee-rating.service';
import { CoffeesModule } from 'src/coffees/coffees.module';

@Module({
  imports: [CoffeesModule],
  providers: [CofeeRatingService],
})
export class CoffeeRatingModule {}
