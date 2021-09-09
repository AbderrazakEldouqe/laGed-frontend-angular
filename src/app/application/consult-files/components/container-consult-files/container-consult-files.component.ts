import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryDocumentService } from 'src/app/application/category-document/services/category-document.service';
import { ICategoryDoc } from 'src/app/_core/models/i-category-doc';
import { EtudiantService } from 'src/app/_core/services/etudiant-service';
import { SubSink } from 'subsink';
import { ConsultFilesService } from '../../services/consult-files.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-container-consult-files',
  templateUrl: './container-consult-files.component.html',
  styleUrls: ['./container-consult-files.component.css'],
})
export class ContainerConsultFilesComponent implements OnInit, OnDestroy {
  /* Start Variables */
  private subs = new SubSink();
  filesData: any[] = [];

  categoryDocumentsData: ICategoryDoc[] = [];

  listAnneeScolaire: string[] = [];

  /* End Variables */
  constructor(
    private consultFilesService: ConsultFilesService,
    private categoryDocumentService: CategoryDocumentService,
    private etudiantService: EtudiantService
  ) {}

  /**
   * ngOnInit
   * * is a life cycle hook called by Angular to indicate that Angular is done creating the component
   */
  ngOnInit(): void {
    this.getAllDocuments();
    this.getAllCategoryDocuments();
    this.getAllAnneeScolaire();
  }

  /* Start Services */
  /**
   * getAllDocuments
   * * It is called for get data From Backend
   */
  getAllDocuments(): void {
    this.subs.add(
      this.consultFilesService
        .getAllCategoryByLastAnneScolaire()
        .subscribe((res: any[]) => {
          this.filesData = res;
        })
    );
  }

  /**
   * getAllCategoryDocuments
   * * It is called for get data From Backend
   */
  getAllCategoryDocuments(): void {
    this.subs.add(
      this.categoryDocumentService.getAll().subscribe((res: ICategoryDoc[]) => {
        this.categoryDocumentsData = res;
      })
    );
  }

  getAllAnneeScolaire() {
    this.etudiantService.getAnneeScolaire().subscribe((res) => {
      console.log(res);
      this.listAnneeScolaire = res;
    });
  }

  searchMultiCriteria(data: any): void {
    this.subs.add(
      this.consultFilesService
        .getEtudiantDocumentByCriteria(
          data?.anneeScolaire,
          data?.matriculeEtudiant,
          data?.nomEtudiant,
          data?.typeDocument
        )
        .subscribe((res: any[]) => {
          this.filesData = res;
        })
    );
  }

  downloadFile(data: any) {
    this.subs.add(
      this.consultFilesService
        .GetFile(data?.idDocument)
        .subscribe((response) => {
          const blob: any = new Blob([response.body], {
            type: 'application/octet-stream',
          });
          const url = window.URL.createObjectURL(blob);
          fileSaver.saveAs(blob, data?.nomDoc);
        })
    );
  }
  /* End Services */
  /**
   * ngOnDestroy
   * * It is called for cleanup logic when a component is destroyed
   */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
