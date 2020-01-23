import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTacheTraiterComponent } from './detail-tache-traiter.component';

describe('DetailTacheTraiterComponent', () => {
  let component: DetailTacheTraiterComponent;
  let fixture: ComponentFixture<DetailTacheTraiterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTacheTraiterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTacheTraiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
