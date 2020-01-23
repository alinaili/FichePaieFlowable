import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeDocumentComponent } from './demande-document.component';

describe('DemandeDocumentComponent', () => {
  let component: DemandeDocumentComponent;
  let fixture: ComponentFixture<DemandeDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
