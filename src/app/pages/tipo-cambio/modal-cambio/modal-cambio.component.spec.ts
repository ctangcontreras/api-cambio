import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCambioComponent } from './modal-cambio.component';

describe('ModalCambioComponent', () => {
  let component: ModalCambioComponent;
  let fixture: ComponentFixture<ModalCambioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCambioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCambioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
