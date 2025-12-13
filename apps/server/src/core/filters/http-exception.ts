import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errors: Record<string, string[]> | null = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        errors = { message: [exceptionResponse] };
      } else if (typeof exceptionResponse === 'object') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res = exceptionResponse as any;
        errors = res.errors ?? null;
      }
    }

    response.status(status).json({
      errors,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
