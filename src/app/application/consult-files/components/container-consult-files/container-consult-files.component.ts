import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryDocumentService } from 'src/app/application/category-document/services/category-document.service';
import { ICategoryDoc } from 'src/app/_core/models/i-category-doc';
import { SubSink } from 'subsink';
import { ConsultFilesService } from '../../services/consult-files.service';

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

  /* End Variables */
  constructor(
    private consultFilesService: ConsultFilesService,
    private categoryDocumentService: CategoryDocumentService
  ) {}

  /**
   * ngOnInit
   * * is a life cycle hook called by Angular to indicate that Angular is done creating the component
   */
  ngOnInit(): void {
    this.getAllDocuments();
    this.getAllCategoryDocuments();
  }

  /* Start Services */
  /**
   * getAllDocuments
   * * It is called for get data From Backend
   */
  getAllDocuments(): void {
    this.subs.add(
      this.consultFilesService.getAll().subscribe((res: any[]) => {
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
  /* End Services */
  /**
   * ngOnDestroy
   * * It is called for cleanup logic when a component is destroyed
   */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
