import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataService } from "src/app/_core/services/data.service";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root',
})
export class SousCategoryDocumentService extends DataService {
  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/apiSousCategorie/SousCategories`, http);
  
  }

 
}
