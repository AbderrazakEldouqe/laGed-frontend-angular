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
        name: 'Eldouqe Abdo',
        matricule: '0001511',
        anneScolaire: '2018/2019',
        typeDocument: 'Bulttin',
        nameDocument: '0001.pdf',
      });
    }
  }

  getAll(headersObject = {}): Observable<any> {
    return of(this.data).pipe(delay(2000));
  }
}
