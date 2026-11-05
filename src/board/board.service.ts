import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  findAll() {
    return `findAll 호출`;
  }

  findOne(id: string) {
    return `게시물 조회 (ID: ${id})`;
  }
}
