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

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll() {
    this.taskService.getTasks();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    this.taskService.getTask(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() body: CreateTaskDto) {
    this.taskService.createTask(body);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateTaskDto) {
    this.taskService.updateTask(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.taskService.removeTask(id);
  }
}
