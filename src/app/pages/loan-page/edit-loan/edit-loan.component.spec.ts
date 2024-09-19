import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { EditLoanComponent } from './edit-loan.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EditLoanComponent', () => {
  let component: EditLoanComponent;
  let fixture: ComponentFixture<EditLoanComponent>;
  let mockDialogRef: { close: jest.Mock };
  const mockData = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    amount: 1000,
    interestRate: 5,
    startDate: '2023-01-01',
    maturityDate: '2024-01-01',
    consent: true,
  };

  beforeEach(async () => {
    mockDialogRef = { close: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [
        EditLoanComponent,
        ReactiveFormsModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        FormBuilder,
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MatDialogRef, useValue: mockDialogRef },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with provided data', () => {
    const { firstName, lastName, amount, interestRate, startDate, maturityDate, consent } = mockData;
    
    expect(component.loanForm.get('firstName')?.value).toBe(firstName);
    expect(component.loanForm.get('lastName')?.value).toBe(lastName);
    expect(component.loanForm.get('amount')?.value).toBe(amount);
    expect(component.loanForm.get('interestRate')?.value).toBe(interestRate);
    expect(component.loanForm.get('startDate')?.value).toEqual(new Date(startDate));
    expect(component.loanForm.get('maturityDate')?.value).toEqual(new Date(maturityDate));
    expect(component.loanForm.get('consent')?.value).toBe(consent);
  });

  it('should add and remove a guarantor', () => {
    component.addGuarantor();
    expect(component.guarantors.length).toBe(1);

    component.removeGuarantor(0);
    expect(component.guarantors.length).toBe(0);
  });

  it('should close the dialog on cancel', () => {
    component.onNoClick();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
