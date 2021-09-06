import { Component, OnInit } from '@angular/core';
import { ICategoryDoc } from 'src/app/_core/models/i-category-doc';
import { JsService } from 'src/app/_core/services/js.service';
import { NotificationService } from 'src/app/_core/services/notification.service';
import { SubSink } from 'subsink';
import { CategoryDocumentService } from '../../services/category-document.service';

@Component({
  selector: 'app-container-category-document',
  templateUrl: './container-category-document.component.html',
  styleUrls: ['./container-category-document.component.css'],
})
export class ContainerCategoryDocumentComponent implements OnInit {
  /* Start Variables */
  private subs = new SubSink();

  categoryDocumentsData: ICategoryDoc[] = [];

  formIsShow = false;
  selectedCategoryDocument: ICategoryDoc | null = null;
  /* End Variables */
  constructor(
    private categoryDocumentService: CategoryDocumentService,
    private notification: NotificationService,
    private jsService: JsService
  ) {}

  /**
   * ngOnInit
   * * is a life cycle hook called by Angular to indicate that Angular is done creating the component
   */
  ngOnInit(): void {
    this.getAllCategoryDocuments();
  }

  showForm(): void {
    this.formIsShow = true;
  }

  backToList(): void {
    this.selectedCategoryDocument = null;
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

  store(categoryDocument: ICategoryDoc): void {
    this.subs.add(
      this.categoryDocumentService
        .create(categoryDocument)
        .subscribe((res: ICategoryDoc) => {
          this.handleResponseStore(res);
        })
    );
  }

  handleResponseStore(data: ICategoryDoc): void {
    this.categoryDocumentsData = this.jsService.spread(
      this.categoryDocumentsData,
      data
    );
    this.notification.success('Category Document bien crée !', 'bien crée !');
    this.formIsShow = false;
  }

  edit(categoryDocument: any): void {
    this.selectedCategoryDocument =
      this.jsService.objectAssign(categoryDocument);
    this.showForm();
  }

  update(categoryDocument: ICategoryDoc): void {
    const id = categoryDocument?.id;
    categoryDocument = this.jsService.deleteElementFromObjectByKey(
      categoryDocument,
      'id'
    );
    this.subs.add(
      this.categoryDocumentService
        .update(id, categoryDocument)
        .subscribe((res: ICategoryDoc) => {
          this.handleResponseUpdate(res);
        })
    );
  }

  handleResponseUpdate(data: ICategoryDoc): void {
    this.categoryDocumentsData =
      this.jsService.modifyObjectElementFromArrayByKey(
        this.categoryDocumentsData,
        data,
        'id'
      );
    this.notification.success(
      `Category Document bien Modfiee !`,
      'bien Modfiee !'
    );
    this.formIsShow = false;
  }

  delete(categoryDocument: any): void {
    const id = categoryDocument.id;
    this.subs.add(
      this.categoryDocumentService.delete(id).subscribe((res: ICategoryDoc) => {
        this.handleResponseDelete(categoryDocument);
      })
    );
  }

  handleResponseDelete(data: ICategoryDoc): void {
    this.categoryDocumentsData = this.jsService.spread(
      this.jsService.deleteObjectElementFromArrayByKey(
        this.categoryDocumentsData,
        data,
        'id'
      )
    );
    this.notification.success(
      `Category Document bien supprimer !`,
      'bien supprimer !'
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
