import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

export interface Board {
  id: number;
  title: string;
  content: string;
  author: string;
  major: string;
}

@Injectable()
export class BoardService {
  private boards: Board[] = [
    {
      id: 1,
      title: '첫 번째 게시글 - 제목',
      content: '첫 번째 게시글 - 본문',
      author: '',
      major: '',
    },
    {
      id: 2,
      title: '두 번째 게시글 - 제목',
      content: '두 번째 게시글 - 본문',
      author: '',
      major: '',
    },
    {
      id: 3,
      title: '세 번째 게시글 - 제목',
      content: '세 번째 게시글 - 본문',
      author: '',
      major: '',
    },
  ];

  findAll(): Board[] {
    return this.boards;
  }

  findOne(id: number): Board {
    // return `게시물 조회 (ID: ${id})`;
    const board = this.boards.find((item) => item.id == id);

    if (!board) {
      throw new NotFoundException(
        `ID ${id}에 해당하는 게시글을 찾을 수 없습니다.`,
      );
    }

    return board;
  }

  create(payload: CreatePostDto) {
    const newBoard = {
      id: this.generateId(),
      ...payload,
    };

    this.boards.push(newBoard);
    return newBoard;
  }

  generateId() {
    return this.boards.length == 0
      ? 1
      : Math.max(...this.boards.map((board) => board.id)) + 1;
  }

  update(id: number, payload: UpdatePostDto) {
    const boardIndex = this.boards.findIndex((board) => board.id == id);

    if (boardIndex == -1) {
      throw new NotFoundException(
        `ID ${id}에 해당하는 게시글을 찾을 수 없습니다.`,
      );
    }

    this.boards[boardIndex] = { ...this.boards[boardIndex], ...payload };

    return this.boards[boardIndex];
  }

  delete(id: number) {
    const boardIndex = this.boards.findIndex((board) => board.id == id);

    if (boardIndex == -1) {
      throw new NotFoundException(
        `ID ${id}에 해당하는 게시글을 찾을 수 없습니다.`,
      );
    }

    this.boards.splice(boardIndex, 1);

    return this.boards;
  }
}
