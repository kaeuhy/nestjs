import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { Board, BoardService } from './board.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

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
  // 해당 핸들러에 파이프 적용
  @UsePipes(new ValidationPipe())
  create(@Body() data: CreatePostDto) {
    // 이곳에 도달한 data는 유효성 검사를 통과한 상태임
    return this.boardService.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdatePostDto): Board{
    return this.boardService.update(id, data)
  }

  @Delete(":id")
  delete(@Param('id', ParseIntPipe) id: number): Board[] {
    return this.boardService.delete(id)
  }
}
