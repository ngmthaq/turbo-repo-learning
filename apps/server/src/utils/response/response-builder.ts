import * as fs from 'fs';

import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { ResponseBuilderPaginationData } from './response';

export class ResponseBuilder {
  public static data<T>(data: T) {
    return {
      data: data,
      statusCode: HttpStatus.OK,
      timestamp: new Date().toISOString(),
    };
  }

  public static pagination<T>(
    data: T,
    paginationData?: ResponseBuilderPaginationData,
  ) {
    return {
      data: data,
      paginationData: paginationData,
      statusCode: HttpStatus.OK,
      timestamp: new Date().toISOString(),
    };
  }

  public static base64(data: string) {
    return {
      data: data,
      statusCode: HttpStatus.OK,
      timestamp: new Date().toISOString(),
    };
  }

  public static base64FromPath(filePath: string) {
    const fileData = fs.readFileSync(filePath);
    const base64Data = fileData.toString('base64');
    return {
      data: base64Data,
      statusCode: HttpStatus.OK,
      timestamp: new Date().toISOString(),
    };
  }

  public static file(data: File, response: Response) {
    response.setHeader(
      'Content-Disposition',
      `attachment; filename=${data.name}`,
    );
    response.setHeader('Content-Type', data.type);
    return response.status(HttpStatus.OK).send(data);
  }

  public static fileFromPath(
    filePath: string,
    fileName: string,
    response: Response,
  ) {
    const fileData = fs.readFileSync(filePath);
    response.setHeader(
      'Content-Disposition',
      `attachment; filename=${fileName}`,
    );
    return response.status(HttpStatus.OK).send(fileData);
  }
}
