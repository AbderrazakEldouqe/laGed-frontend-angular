import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ICategoryDoc } from 'src/app/_core/models/i-category-doc';
import { DataService } from 'src/app/_core/services/data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryDocumentService extends DataService {
  data: ICategoryDoc[];
  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/category-document`, http);
    this.data = [];
    for (let i = 0; i <= 10; i++) {
      this.data.push({
        id: i.toString(),
        cat_doc: 'bulltin' + i,
        libelle: 'bulltin' + i,
      });
    }
  }

  getAll(headersObject = {}): Observable<any> {
    return of(this.data).pipe(delay(2000));
  }
}
