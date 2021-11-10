import { Component, OnInit } from '@angular/core';
import { CategoryDocumentService } from 'src/app/application/category-document/services/category-document.service';
import { ICategoryDoc } from 'src/app/_core/models/i-category-doc';
import { ISousCategoryDoc } from 'src/app/_core/models/i-sous-category-doc';
import { JsService } from 'src/app/_core/services/js.service';
import { NotificationService } from 'src/app/_core/services/notification.service';
import { SubSink } from 'subsink';
import { SousCategoryDocumentService } from '../../services/sous-category-document.service';

@Component({
  selector: 'app-container-sous-category-document',
  templateUrl: './container-sous-category-document.component.html',
  styleUrls: ['./container-sous-category-document.component.css'],
})
export class ContainerSousCategoryDocumentComponent implements OnInit {
  /* Start Variables */
  private subs = new SubSink();
  categoryDocumentsData: ICategoryDoc[] = [];
  sousCategoryDocumentsData: ISousCategoryDoc[] = [];
  formIsShow = false;
  selectedSousCategoryDocument: ICategoryDoc | null = null;

  /* End Variables */
  constructor(
    private categoryDocumentService: CategoryDocumentService,
    private sousCategoryDocumentService: SousCategoryDocumentService,
    private notification: NotificationService,
    private jsService: JsService
  ) {}

  ngOnInit(): void {
    this.getAllSousCategoryDocuments();
    this.getAllCategoryDocuments();
  }

  showForm(): void {
    this.formIsShow = true;
  }

  backToList(): void {
    this.selectedSousCategoryDocument = null;
    this.formIsShow = false;
  }

  /* Start Services */

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

  /**
   * getAllSousCategoryDocuments
   * * It is called for get data From Backend
   */
  getAllSousCategoryDocuments(): void {
    this.subs.add(
      this.sousCategoryDocumentService
        .getAll()
        .subscribe((res: ISousCategoryDoc[]) => {
          this.sousCategoryDocumentsData = res;
          console.log(this.sousCategoryDocumentsData);
        })
    );
  }

  edit(sousCategoryDocument: any): void {
    this.selectedSousCategoryDocument =
      this.jsService.objectAssign(sousCategoryDocument);
    this.showForm();
  }

  delete(sousCategoryDocument: any): void {
    const id = sousCategoryDocument.idSousCategorie;
    this.subs.add(
      this.sousCategoryDocumentService
        .delete(id)
        .subscribe((res: ISousCategoryDoc) => {
          this.handleResponseDelete(sousCategoryDocument);
        })
    );
  }
  store(sousCategoryDocument: ISousCategoryDoc): void {
    this.subs.add(
      this.sousCategoryDocumentService
        .create(sousCategoryDocument)
        .subscribe((res: ISousCategoryDoc) => {
          this.handleResponseStore(res);
        })
    );
  }

  handleResponseStore(data: ISousCategoryDoc): void {
    this.sousCategoryDocumentsData = this.jsService.spread(
      this.sousCategoryDocumentsData,
      data
    );
    this.notification.success(
      'Sous categorie cocument bien crée !',
      'Bien crée !'
    );
    this.formIsShow = false;
  }

  handleResponseDelete(data: ISousCategoryDoc): void {
    this.sousCategoryDocumentsData = this.jsService.spread(
      this.jsService.deleteObjectElementFromArrayByKey(
        this.sousCategoryDocumentsData,
        data,
        'idSousCategorie'
      )
    );
    this.notification.success(
      `Categorie document bien supprimer !`,
      'bien supprimer !'
    );
  }

  update(sousCategoryDocument: ISousCategoryDoc): void {
    const id = sousCategoryDocument?.idSousCategorie;
    this.subs.add(
      this.sousCategoryDocumentService
        .update(id, sousCategoryDocument)
        .subscribe((res: ISousCategoryDoc) => {
          this.handleResponseUpdate(res);
        })
    );
  }

  handleResponseUpdate(data: ISousCategoryDoc): void {
    this.sousCategoryDocumentsData =
      this.jsService.modifyObjectElementFromArrayByKey(
        this.sousCategoryDocumentsData,
        data,
        'idSousCategorie'
      );
    this.notification.success(
      `Categorie document bien Modfiée !`,
      'Bien Modfiée !'
    );
    this.formIsShow = false;
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
