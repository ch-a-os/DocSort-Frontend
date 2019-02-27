import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSingleFileComponent } from './upload-single-file.component';

describe('UploadSingleFileComponent', () => {
  let component: UploadSingleFileComponent;
  let fixture: ComponentFixture<UploadSingleFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSingleFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSingleFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
