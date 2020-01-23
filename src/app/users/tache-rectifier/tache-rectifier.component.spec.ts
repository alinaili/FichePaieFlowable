import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheRectifierComponent } from './tache-rectifier.component';

describe('TacheRectifierComponent', () => {
  let component: TacheRectifierComponent;
  let fixture: ComponentFixture<TacheRectifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacheRectifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheRectifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
