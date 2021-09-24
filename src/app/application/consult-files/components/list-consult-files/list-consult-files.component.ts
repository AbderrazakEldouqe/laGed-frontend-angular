import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IEtudiantDoc } from 'src/app/_core/models/i-etudiant-doc';
import { TokenService } from 'src/app/_core/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-consult-files',
  templateUrl: './list-consult-files.component.html',
  styleUrls: ['./list-consult-files.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class ListConsultFilesComponent implements OnInit {
  /* Start Variables */
  @Input() filesData: any[] = [];

  @Input() isStartSearch = false;
  @Output() downloadEvent = new EventEmitter();

  @Output() editEvent = new EventEmitter();

  @Output() shareEvent = new EventEmitter();

  @Output() AnnulerEvent = new EventEmitter();

  config = {
    id: 'custom',
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: this.filesData.length,
  };
  tableSizes = [4, 8, 10, 14];
  filter = '';

  /* End Variables */
  constructor(private tokenService: TokenService, private datePipe: DatePipe) {}

  ngOnInit(): void {}

  /**
   * onTableSizeChange
   * * For change size Pagination per page
   */
  onTableSizeChange(event: any): void {
    this.config.itemsPerPage = event.target.value;
    this.config.currentPage = 1;
  }
  download(data: any) {
    this.downloadEvent.emit(data);
  }

  annuler(idFile: any) {
    //this.downloadEvent.emit(data);
    Swal.fire({
      title: 'Tu es sure?',
      text: 'Voulez-vous vraiment annuler ce document',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui!',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.value) {
        //this.deleteEvent.emit(categoryDocuments);
        Swal.fire({
          title: 'Entrer Votre Motif',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off',
          },
          customClass: {
            validationMessage: 'my-validation-message',
          },
          showCancelButton: true,
          confirmButtonText: 'Envoyé',
          cancelButtonText: 'revenir',
          showLoaderOnConfirm: true,
          preConfirm: (value) => {
            if (!value) {
              Swal.showValidationMessage(' Motif est obligatoire');
            }
          },
          allowOutsideClick: () => !Swal.isLoading(),
          backdrop: true,
        }).then((result) => {
          if (result.isConfirmed) {
            //Swal.fire('Saved !' + result.value, '', 'success');
            this.AnnulerEvent.emit({ idFile, motif: result.value });
          }
        });
      }
    });
  }

  edit(etudiantDocument: IEtudiantDoc): void {
    this.editEvent.emit(etudiantDocument);
  }

  get isAdmin() {
    return this.tokenService.isAdmin();
  }

  shareWithEmail(idFile: any) {
    Swal.fire({
      title: 'Entrer Votre Email',
      input: 'text',
      inputValue: 'test@gmail.com',
      inputAttributes: {
        autocapitalize: 'off',
      },
      customClass: {
        validationMessage: 'my-validation-message',
      },
      showCancelButton: true,
      confirmButtonText: 'Envoyé',
      cancelButtonText: 'revenir',
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if (!value) {
          Swal.showValidationMessage(' Email est obligatoire');
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Annuler ' + result.value, '', 'success');
        this.shareEvent.emit({ idFile, email: result.value });
      }
    });
  }

  infoFile(data: any) {
    console.log('data', data);
    Swal.fire({
      title: `<strong> Info </strong>`,
      icon: 'info',
      html: `<b>Date Annulation</b>: ${this.transformDate(
        data.dateAnnulation
      )} <br><b>Annulée Par</b>: ${
        data?.annulePar ? data?.annulePar : ''
      } <br><b>Motif </b>: ${data?.motif ? data?.motif : ''}`,
    });
  }

  transformDate(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
