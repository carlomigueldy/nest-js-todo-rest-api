import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly model: Model<TodoDocument>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Todo> {
    return await this.model.findById(id).exec();
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return await new this.model(createTodoDto).save();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return await this.model.findByIdAndUpdate(id, updateTodoDto).exec();
  }

  async delete(id: string): Promise<Todo> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
