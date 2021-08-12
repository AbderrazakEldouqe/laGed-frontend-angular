import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConsultFilesService {
  data: any[];
  constructor() {
    this.data = [];
    for (let i = 0; i <= 10; i++) {
      this.data.push({
        name: 'Sony A7 III',
        category: 'Photography',
        stock: 20,
        status: i % 2 === 0 ? 'Inactive' : 'Active',
      });
    }
  }

  getAll(headersObject = {}): Observable<any> {
    return of(this.data).pipe(delay(2000));
  }
}
