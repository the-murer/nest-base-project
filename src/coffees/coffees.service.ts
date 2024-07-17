import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeDto } from './dto/create-coffe.dto/create-coffe.dto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: '3 Cocaroces',
      brand: 'Nestle',
      flavors: ['Mogiana Paulista', 'Cerrado'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const finded = this.coffees.find((c) => c.id === +id);
    if (!finded) {
      throw new NotFoundException(`Café ${id} não encontrado`);
    }
    return finded;
  }

  create(createCoffeeDto: CreateCoffeDto) {
    const id = this.coffees[this.coffees.length - 1].id + 1;
    const objToCreate = { id, ...createCoffeeDto };
    this.coffees.push(objToCreate);
    return objToCreate;
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (!existingCoffee) {
      throw new NotFoundException(`Café ${id} não encontrado para atualizar`);
    }
    if (existingCoffee) {
      const index = this.coffees.findIndex((c) => c.id === +id);
      this.coffees.splice(index, 1, { ...existingCoffee, ...updateCoffeeDto });
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((c) => c.id === +id);
    if (coffeeIndex < 0) {
      throw new NotFoundException(`Café ${id} não existe, verificar!`);
    }
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
