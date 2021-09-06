import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ICategoryDoc } from 'src/app/_core/models/i-category-doc';

@Component({
  selector: 'app-filter-search-consult-files',
  templateUrl: './filter-search-consult-files.component.html',
  styleUrls: ['./filter-search-consult-files.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterSearchConsultFilesComponent implements OnInit {
  @Input() categoryDocumentsData: ICategoryDoc[] = [];
  constructor() {}

  ngOnInit(): void {}
}
