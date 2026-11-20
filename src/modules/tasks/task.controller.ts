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
  findAll(): Promise<TaskEntity[]> {
    return this.taskService.getTasks();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
    return this.taskService.getTask(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() body: CreateTaskDto) {
    return this.taskService.createTask(body);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateTaskDto): Promise<TaskEntity> {
    return this.taskService.updateTask(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.removeTask(id);
  }
}
