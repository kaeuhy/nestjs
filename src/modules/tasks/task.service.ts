import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaskEntity } from './entities/task.entity';

import { CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async getTasks(): Promise<TaskEntity[]> {
    return await this.taskRepository.find();
  }

  async getTask(id: number): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`ID의 값이 ${id}인 테스크를 찾을 수가 없습니다.`)
    }

    return task;
  }

  createTask(payload: CreateTaskDto) {}

  updateTask(id: number, payload: UpdateTaskDto) {}

  removeTask(id: number) {}
}
