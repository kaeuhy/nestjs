import { Body, Controller, Get, Param } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  // boardService: 실제 주입받을 객체의 이름
  // BoardService: 주입받은 서비스의 타입 -> Nest.js가 이 타입을 보고 인스턴스를 찾아 주입
  constructor(private readonly boardService: BoardService) {}

  @Get()
  finAll() {
    return this.boardService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.boardService.findOne(id);
  }
}
