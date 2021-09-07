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
export class EtudiantService  extends DataService {
  dataEtudiant : IEtudiant[] = [];
  dataInscription?: IInscription[];

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/etudiants`, http);
    this.createStudentData()
    this.createAnneeInscriptionData()
  }


createStudentData(){
    this.dataEtudiant = [];
    for (let i = 0; i <= 4; i++) {
      this.dataEtudiant.push({
        id: i.toString(),        
        nom : 'Etudiants Nom' + i,
        prenom : 'Etudiants Prenom'+ i,
        code : 'Etudiants code'+ i,
      });
    }
  }


  createAnneeInscriptionData(){
    this.dataInscription = [];
      for (let i = 0; i < this.dataEtudiant.length ; i++) {
        this.dataInscription.push({
          id: i.toString(),        
          anne: (2015+i).toString(),
          inscription : 'inscription'+ i,
          etudiant : this.dataEtudiant[i],
        }); 
      }
  }




  getdataEtudiant(headersObject = {}): Observable<any> {
    return of(this.dataEtudiant).pipe(delay(2000));
  }




  getAnneeInscriptionData(headersObject = {}): Observable<any> {
    return of(this.dataInscription).pipe(delay(2000));
  }

}
