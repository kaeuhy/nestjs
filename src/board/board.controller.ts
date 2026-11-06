import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Board, BoardService } from './board.service';

@Controller('board')
export class BoardController {
  // boardService: 실제 주입받을 객체의 이름
  // BoardService: 주입받은 서비스의 타입 -> Nest.js가 이 타입을 보고 인스턴스를 찾아 주입
  constructor(private readonly boardService: BoardService) {}

  @Get()
  finAll(): Board[] {
    return this.boardService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Board {
    return this.boardService.findOne(Number(id));
  }

  @Post()
  create(@Body() data: any) {
    return this.boardService.create(data);
  }
}
