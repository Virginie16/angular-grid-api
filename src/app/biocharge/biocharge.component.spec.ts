import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiochargeComponent } from './biocharge.component';

describe('BiochargeComponent', () => {
  let component: BiochargeComponent;
  let fixture: ComponentFixture<BiochargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiochargeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiochargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
