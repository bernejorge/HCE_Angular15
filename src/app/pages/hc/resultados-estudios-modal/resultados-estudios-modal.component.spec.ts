import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosEstudiosModalComponent } from './resultados-estudios-modal.component';

describe('ResultadosEstudiosModalComponent', () => {
  let component: ResultadosEstudiosModalComponent;
  let fixture: ComponentFixture<ResultadosEstudiosModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosEstudiosModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosEstudiosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
