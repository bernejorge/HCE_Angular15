import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProfesionalesComponent } from './card-profesionales.component';

describe('CardProfesionalesComponent', () => {
  let component: CardProfesionalesComponent;
  let fixture: ComponentFixture<CardProfesionalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardProfesionalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProfesionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
