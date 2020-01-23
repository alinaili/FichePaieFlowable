import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTacheComponent } from './detail-tache.component';

describe('DetailTacheComponent', () => {
  let component: DetailTacheComponent;
  let fixture: ComponentFixture<DetailTacheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTacheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
