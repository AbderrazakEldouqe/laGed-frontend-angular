import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { ConsultFilesService } from '../../services/consult-files.service';

@Component({
  selector: 'app-container-consult-files',
  templateUrl: './container-consult-files.component.html',
  styleUrls: ['./container-consult-files.component.css'],
})
export class ContainerConsultFilesComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  filesData: any[] = [];
  constructor(private consultFilesService: ConsultFilesService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.subs.add(
      this.consultFilesService.getAll().subscribe((res: any[]) => {
        this.filesData = res;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
