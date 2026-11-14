import { Injectable } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TaskService {
  getTasks() {}

  getTask(id: number) {}

  createTask(payload: CreateTaskDto) {}

  updateTask(id: number, payload: UpdateTaskDto) {}

  removeTask(id: number) {}
}
