import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getUserById(idUser: number): Observable<object> {
    return this.http.get(environment.apiUrl + '/apiUser/getUserById/' + idUser);
  }
  getCountAllDocuments(){
    return this.http.get(environment.apiUrl + '/apiEtudiantDocument/getCountAllDocuments');
  }
 

  getCountAllEtudiants(){
    return this.http.get(environment.apiUrl + '/apiEtudiant/getCountAllEtudiants');
  }
}
