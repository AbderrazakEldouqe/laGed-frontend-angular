import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadStudentFileService{
  constructor(private http : HttpClient) {}

  uploadFilesStudent(StudentFilesFrom : any) : Observable<any>{
    const formData = new FormData();
    formData.append('UploadFilesRequest', JSON.stringify( StudentFilesFrom));

      return this.http.post(environment.apiUrl +"/apiEtudiantDocument/uplaodFiles",  formData )
  }

}
