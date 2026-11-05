import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('users')
export class AppController {
  @Post()
  create(@Body() body: { email: string; password: string; }) {
    return `새로운 사용자 생성: ${body.email}`;
  }

  // example) GET /users?page=2
  @Get()
  findAll(@Query("page") page?: number) {
    const currentPage = page || 1;
    return `모든 사용자 조회 (현재 페이지: ${currentPage})`;
  }

  // example) GET /users/5
  @Get(":id")
  findOne(@Param("id") id: string) {
    return `사용자 조회 (ID: ${id})`;
  }

  // example) PUT /users/5
  @Put(":id")
  update(@Param("id") id: string, @Body() body: { name: string }) {
    return `사용자 ID-${id} 수정 -> 이름: ${body.name}`;
  }

  // example) PUT /users/5
  @Delete(":id")
  delete(@Param("id") id: string) {
    return `사용자 삭제 (ID: ${id})`;
  }
}