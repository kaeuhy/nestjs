import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { TaskService } from './task.service';
import { TaskEntity } from './entities/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(): Promise<TaskEntity[]> {
    return await this.taskService.getTasks();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
    return await this.taskService.getTask(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() body: CreateTaskDto) {
    return await this.taskService.createTask(body);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateTaskDto) {
    return await this.taskService.updateTask(id, body);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.removeTask(id);
  }
}
