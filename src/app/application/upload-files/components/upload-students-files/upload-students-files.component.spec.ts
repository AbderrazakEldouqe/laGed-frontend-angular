import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStudentsFilesComponent } from './upload-students-files.component';

describe('UploadStudentsFilesComponent', () => {
  let component: UploadStudentsFilesComponent;
  let fixture: ComponentFixture<UploadStudentsFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadStudentsFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadStudentsFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
