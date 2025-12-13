import { HttpException } from '@nestjs/common';

export class Exception extends HttpException {
  constructor(status: number, errors?: Record<string, string[]>) {
    super({ errors: errors ?? null }, status);
  }
}
