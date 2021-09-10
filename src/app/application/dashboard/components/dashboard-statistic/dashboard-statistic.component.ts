import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TokenService } from 'src/app/_core/services/token.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-statistic',
  templateUrl: './dashboard-statistic.component.html',
  styleUrls: ['./dashboard-statistic.component.css'],
})
export class DashboardStatisticComponent implements OnInit {

  CountAllDocuments : number  | null = null;
  CountAllEtudiants: number  | null = null;
  constructor(private dashboardService: DashboardService ,    private tokenService: TokenService,
    ) {}

  ngOnInit(): void {
    this.allRequests()
    this.dashboardService
      .getUserById(1)
      .subscribe((res: any) => console.log(res));
  }


 /**
   * allRequests
   * * For ForkJoin (merge) All request In one response
   */
  allRequests() {

    /**
         * getMambers
         * * For Get All getMambers By ID
         */
        let CountAllDocumentsData = this.dashboardService.getCountAllDocuments();
        /**
         * getFonctions
         * * For Get All Fonctions
         */
        let CountAllEtudiantsData = this.dashboardService.getCountAllEtudiants();
    
         forkJoin([
          CountAllDocumentsData,
          CountAllEtudiantsData,
          ]).subscribe(
            (results: any) => {
              console.log('result', results);
              this.CountAllDocuments = results[0];
              this.CountAllEtudiants = results[1];

            },
            (error: Response) => {
               console.log('error : ',error);
            }
          )
      }


}

