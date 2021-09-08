import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEtudiant } from 'src/app/_core/models/i-etudiant';
import { IInscription } from 'src/app/_core/models/i-inscription';
import { EtudiantService } from 'src/app/_core/services/etudiant-service';

@Component({
  selector: 'app-upload-students-files',
  templateUrl: './upload-students-files.component.html',
  styleUrls: ['./upload-students-files.component.css'],
})
export class UploadStudentsFilesComponent implements OnInit {
  showTableFilesOrIconBolean: boolean = false;
  filesStudentUploadedFromGroup: FormGroup = new FormGroup({});
  filesUploadedFromGroup : FormGroup = new FormGroup({});
  listAnneeScolaire: string[] = [];
  listStudentByAnneeScolaire : IEtudiant[]=[]

  constructor(private fb: FormBuilder , private etudiantService : EtudiantService ) {
  }

  ngOnInit(): void {
    this.filesStudentUploadedFromGroup = this.fb.group({
      AnneeScolaire : [null, Validators.required],
      studentCode: [{value: null, disabled: true}, Validators.required],
      studentFiles: this.fb.array([]),
    });
    this.getAllAnneeScolaire();

  }

  showTableFilesOrIcon() {}

  uploadNow() {
    console.log('send Files To Back-End');
    console.log(this.filesStudentUploadedFromGroup.value);
  }

  filesStudentUploadedEventEmitter(event: any) {
    if (event.length > 0) {
      this.showTableFilesOrIconBolean = true;
    } else {
      this.showTableFilesOrIconBolean = false;
    }
  }

  getAllAnneeScolaire(){
  this.etudiantService.getAnneeScolaire().subscribe((res) => {
    console.log(res)
    this.listAnneeScolaire = res
  })
}

getAllStudentByAnneeScolaire(event : any){
  console.log(event)
  this.etudiantService.getAllStudentByAnneeScolaire(event).subscribe((res) => {
    this.listStudentByAnneeScolaire = res
  })
}


}
