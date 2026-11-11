import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    // 실행 컨텍스트에서 HTTP 관련 객체만 가져옴
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // 예외가 발생한 상태 코드 (400, 404 등)
    const status = exception.getStatus();

    // exception에서 message 부분을 추출
    const errorResponse = exception.getResponse();
    const message =
      typeof errorResponse === 'object' && 'message' in errorResponse
        ? errorResponse['message']
        : errorResponse;

    // 우리가 원하는 형태로 응답 JSON을 조립
    response.status(status).json({
      statusCode: status,
      success: false,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }
}
