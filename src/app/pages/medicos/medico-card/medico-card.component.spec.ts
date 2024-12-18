import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoCardComponent } from './medico-card.component';

describe('MedicoCardComponent', () => {
  let component: MedicoCardComponent;
  let fixture: ComponentFixture<MedicoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
