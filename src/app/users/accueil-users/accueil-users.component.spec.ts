import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilUsersComponent } from './accueil-users.component';

describe('AccueilUsersComponent', () => {
  let component: AccueilUsersComponent;
  let fixture: ComponentFixture<AccueilUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccueilUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
