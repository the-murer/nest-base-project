import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CoffeesService } from './coffees.service';
import { CreateCoffeDto } from './dto/create-coffe.dto/create-coffe.dto';
import { UpdateCoffeeDto } from './dto/update-coffe.dto/update-coffe.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto/pagination-query.dto';
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll(@Query() padinationQuery: PaginationQueryDto) {
    return this.coffeesService.findAll(padinationQuery);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(id);
  }
  @Post()
  create(@Body() createCoffeDto: CreateCoffeDto) {
    return this.coffeesService.create(createCoffeDto);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
