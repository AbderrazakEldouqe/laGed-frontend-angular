import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategoryDoc } from 'src/app/_core/models/i-category-doc';

@Component({
  selector: 'app-filter-search-consult-files',
  templateUrl: './filter-search-consult-files.component.html',
  styleUrls: ['./filter-search-consult-files.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterSearchConsultFilesComponent implements OnInit {
  @Input() categoryDocumentsData: ICategoryDoc[] = [];

  @Input() listAnneeScolaire: string[] = [];

  @Output() SearchFilterEvent = new EventEmitter();

  form!: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.initialFormGroupe();
  }

  initialFormGroupe(): void {
    this.form = new FormGroup({
      anneeScolaire: new FormControl(null, []),
      matriculeEtudiant: new FormControl(null, []),
      nomEtudiant: new FormControl(null, []),
      typeDocument: new FormControl(null, []),
    });
  }

  onSubmit(): void {
    console.log(this.form.value);
    this.SearchFilterEvent.emit(this.form.value);
  }
}
