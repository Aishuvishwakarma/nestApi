import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  getApiRoot(): string {
    return 'API Root';
  }
}
