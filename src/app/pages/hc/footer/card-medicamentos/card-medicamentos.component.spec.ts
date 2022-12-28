import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMedicamentosComponent } from './card-medicamentos.component';

describe('CardMedicamentosComponent', () => {
  let component: CardMedicamentosComponent;
  let fixture: ComponentFixture<CardMedicamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardMedicamentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
