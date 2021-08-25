import { Component, OnDestroy, OnInit } from '@angular/core';
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

  /* End Variables */
  constructor(private consultFilesService: ConsultFilesService) {}

  /**
   * ngOnInit
   * * is a life cycle hook called by Angular to indicate that Angular is done creating the component
   */
  ngOnInit(): void {
    this.getAll();
  }

  /* Start Services */
  /**
   * getAll
   * * It is called for get data From Backend
   */
  getAll(): void {
    this.subs.add(
      this.consultFilesService.getAll().subscribe((res: any[]) => {
        this.filesData = res;
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
