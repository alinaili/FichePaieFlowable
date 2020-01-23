import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilHomeComponent } from './accueil-home.component';

describe('AccueilHomeComponent', () => {
  let component: AccueilHomeComponent;
  let fixture: ComponentFixture<AccueilHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccueilHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
