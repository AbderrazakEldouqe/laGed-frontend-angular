import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryDocumentService } from 'src/app/application/category-document/services/category-document.service';
import { ICategoryDoc } from 'src/app/_core/models/i-category-doc';
import { EtudiantService } from 'src/app/_core/services/etudiant.service';
import { SubSink } from 'subsink';
import { ConsultFilesService } from '../../services/consult-files.service';
import * as fileSaver from 'file-saver';
import { IEtudiantDoc } from 'src/app/_core/models/i-etudiant-doc';
import { JsService } from 'src/app/_core/services/js.service';

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

  formIsShow = false;

  selectedEtudiantDocument: IEtudiantDoc | null = null;

  /* End Variables */
  constructor(
    private consultFilesService: ConsultFilesService,
    private categoryDocumentService: CategoryDocumentService,
    private etudiantService: EtudiantService,
    private jsService: JsService
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

  edit(categoryDocument: any): void {
    this.selectedEtudiantDocument =
      this.jsService.objectAssign(categoryDocument);
    this.showForm();
  }

  showForm(): void {
    this.formIsShow = true;
  }

  backToList(): void {
    this.selectedEtudiantDocument = null;
    this.formIsShow = false;
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

  update(etudiantDocument: IEtudiantDoc): void {
    /*const id = categoryDocument?.idCategorie;
    categoryDocument = this.jsService.deleteElementFromObjectByKey(
      categoryDocument,
      'idCategorie'
    );*/
    /*this.subs.add(
      this.consultFilesService
        .update(id, etudiantDocument)
        .subscribe((res: IEtudiantDoc) => {
          this.handleResponseUpdate(res);
        })
    );*/
  }
  /*handleResponseUpdate(data: ICategoryDoc): void {
    this.categoryDocumentsData =
      this.jsService.modifyObjectElementFromArrayByKey(
        this.categoryDocumentsData,
        data,
        'idCategorie'
      );
    this.notification.success(
      `Category Document bien Modfiee !`,
      'bien Modfiee !'
    );
    this.formIsShow = false;
  }*/
  /* End Services */
  /**
   * ngOnDestroy
   * * It is called for cleanup logic when a component is destroyed
   */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
