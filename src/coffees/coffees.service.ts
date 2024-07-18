import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeDto } from './dto/create-coffe.dto/create-coffe.dto';
import { Connection, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { UpdateCoffeeDto } from './dto/update-coffe.dto/update-coffe.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity/event.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  findAll(padinationQuery: PaginationQueryDto) {
    return this.coffeeModel
      .find()
      .skip(padinationQuery.offset)
      .limit(padinationQuery.limit)
      .exec();
  }

  async findOne(id: string) {
    const finded = await this.coffeeModel.findById(id);
    if (!finded) {
      throw new NotFoundException(`Café ${id} não encontrado`);
    }
    return finded;
  }

  create(createCoffeeDto: CreateCoffeDto) {
    const coffee = new this.coffeeModel(createCoffeeDto);
    return coffee.save();
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = await this.coffeeModel
      .findOneAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
      .exec();

    if (!existingCoffee) {
      throw new NotFoundException(`Café ${id} não encontrado para atializar`);
    }
    return existingCoffee;
  }

  async remove(id: string) {
    return this.coffeeModel.deleteOne({ _id: id }).exec();
  }

  async recommendCoffee(coffee: Coffee) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      coffee.recommendations++;

      const recommendEvent = new this.eventModel({
        name: 'recommend_coffee',
        type: 'coffee',
        payload: { coffeeId: coffee.id },
      });
      await recommendEvent.save({ session });
      await coffee.save({ session });

      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
  }
}
