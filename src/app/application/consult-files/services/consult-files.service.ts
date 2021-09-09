import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConsultFilesService {
  /*data: any[];
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
  }*/
  constructor(private http: HttpClient) {}
  getAllCategoryByLastAnneScolaire(headersObject = {}): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/apiEtudiantDocument/getEtudiantDocumentByLastAnneScolaire`,
      {
        headers: headersObject,
      }
    );
  }

  getEtudiantDocumentByCriteria(
    anneeScolaire: string,
    matriculeEtudiant: string,
    nomEtudiant: string,
    typeDocument: string,
    headersObject = {}
  ): Observable<any> {
    let query: string = '';
    if (anneeScolaire) {
      query += 'anneeScolaire=' + anneeScolaire;
    }
    if (matriculeEtudiant) {
      query += '&matriculeEtudiant=' + matriculeEtudiant;
    }
    if (nomEtudiant) {
      query += '&nomEtudiant=' + nomEtudiant;
    }
    if (typeDocument) {
      query += '&typeDocument=' + typeDocument;
    }
    return this.http.get(
      `${environment.apiUrl}/apiEtudiantDocument/getEtudiantDocumentCriteria?${query}`,
      {
        headers: headersObject,
      }
    );
  }

  GetFile(idDoc: any, headersObject = {}): Observable<HttpResponse<any>> {
    return this.http.get(
      `${environment.apiUrl}/apiEtudiantDocument/downloadFile?idDocument=${idDoc}`,
      {
        headers: headersObject,
        responseType: 'blob',
        observe: 'response',
      }
    );
  }
}
