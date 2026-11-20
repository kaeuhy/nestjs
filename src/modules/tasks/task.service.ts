import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

  // SQL: INSERT INTO tasks (title, content, category, thumbnail ...)
  async createTask(payload: CreateTaskDto) {
    // create(): DTO 데이터를 바탕으로 새로운 엔티티 인스턴스를 생성 -> DB 저장 전 단계
    const newTask = this.taskRepository.create(payload);

    // save(): 생성된 엔티티 객체를 실제 DB 테이블에 저장
    await this.taskRepository.save(newTask);

    return {
      message: '테스크 생성을 완료하였습니다.',
      statusCode: HttpStatus.CREATED,
    }
  }

  async updateTask(id: number, payload: UpdateTaskDto): Promise<TaskEntity> {
    const task = await this.getTask(id);

    // 데이터 병합
    // Object.assign(대상객체, 소스객체)을 사용하여 기존 엔티티에 수정된 내용만 덮어씌움
    Object.assign(task, payload);

    // DB 저장
    // save() 메서드는 엔티티에 primary key(id)가 포함되어 있으면 새로운 행을 생성하지 않고, 기존 행을 업데이트함
    return await this.taskRepository.save(task);
  }

  async removeTask(id: number) {
    const task = await this.taskRepository.findOne({ where: { id }});

    if (!task) {
      throw new NotFoundException(`ID의 값이 ${id}인 테스크를 찾을 수가 없습니다.`,);
    }
    await this.taskRepository.delete(id);

    return {
      message: "테스크 삭제를 완료했습니다.",
      statusCode: HttpStatus.NO_CONTENT
    }
  }
}
