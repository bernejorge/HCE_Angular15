import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenClinicoComponent } from './resumen-clinico.component';

describe('ResumenClinicoComponent', () => {
  let component: ResumenClinicoComponent;
  let fixture: ComponentFixture<ResumenClinicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenClinicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenClinicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
