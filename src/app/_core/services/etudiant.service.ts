import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ICategoryDoc } from 'src/app/_core/models/i-category-doc';
import { DataService } from 'src/app/_core/services/data.service';
import { environment } from 'src/environments/environment';
import { IEtudiant } from '../models/i-etudiant';
import { IInscription } from '../models/i-inscription';

@Injectable({
  providedIn: 'root',
})
export class EtudiantService {
  dataEtudiant: IEtudiant[] = [];
  dataInscription?: IInscription[];

  constructor(private http: HttpClient) {}
  getAnneeScolaire(): Observable<any> {
    return this.http.get(
      environment.apiUrl + '/apiInscription/getAllAnneScolaires'
    );
  }

  getAllStudentByAnneeScolaire(AnneScolaires: any): Observable<any> {
    return this.http.get(
      environment.apiUrl +
        '/apiEtudiant/getAllEtudiantByAnneScolaires?anneeScolaire=' +
        AnneScolaires
    );
  }
}
