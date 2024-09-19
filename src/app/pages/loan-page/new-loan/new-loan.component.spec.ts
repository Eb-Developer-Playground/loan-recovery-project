import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLoanComponent } from './new-loan.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NewLoanComponent', () => {
  let component: NewLoanComponent;
  let fixture: ComponentFixture<NewLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewLoanComponent, 
        NoopAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
