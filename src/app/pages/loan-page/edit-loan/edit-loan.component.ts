import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { startDateBeforeMaturityDate } from '../../../validators/date.validator'; // Adjust the path as needed

@Component({
  selector: 'app-edit-loan',
  standalone: true,
  templateUrl: './edit-loan.component.html',
  styleUrls: ['./edit-loan.component.sass'],
  imports: [
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
    MatCardModule,
    CommonModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter }, 
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS }
  ],
})
export class EditLoanComponent implements OnInit {
  loanForm!: FormGroup;
  loanId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<EditLoanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loanId = this.route.snapshot.paramMap.get('id') || this.data?.id;

    this.loanForm = this.fb.group({
      firstName: [this.data?.firstName || '', Validators.required],
      lastName: [this.data?.lastName || '', Validators.required],
      amount: [this.data?.amount || null, Validators.required],
      interestRate: [this.data?.interestRate || null, Validators.required],
      startDate: [{ value: this.data?.startDate ? new Date(this.data.startDate) : null, disabled: true }, Validators.required],
      maturityDate: [this.data?.maturityDate ? new Date(this.data.maturityDate) : null, Validators.required],
      guarantors: this.fb.array([]),
      consent: [this.data?.consent || false, Validators.requiredTrue],
    }, { validator: startDateBeforeMaturityDate() });

    this.handleDateChanges();

    if (this.loanId) {
      this.loadLoanData(this.loanId);
    }
  }

  handleDateChanges(): void {
    const startDateControl = this.loanForm.get('startDate');
    const maturityDateControl = this.loanForm.get('maturityDate');

    maturityDateControl?.valueChanges.subscribe(maturityDate => {
      if (maturityDate) {
        startDateControl?.enable();
        const startDateValue = startDateControl?.value;
        if (startDateValue && new Date(startDateValue) > new Date(maturityDate)) {
          startDateControl?.setValue(null);
        }
      } else {
        startDateControl?.disable();
        startDateControl?.setValue(null);
      }
    });

    startDateControl?.valueChanges.subscribe(startDate => {
      const maturityDateValue = maturityDateControl?.value;
      if (maturityDateValue && startDate && new Date(startDate) > new Date(maturityDateValue)) {
        startDateControl?.setErrors({ startDateAfterMaturityDate: true });
      } else {
        startDateControl?.updateValueAndValidity();
      }
    });
  }

  get guarantors(): FormArray {
    return this.loanForm.get('guarantors') as FormArray;
  }

  addGuarantor(): void {
    this.guarantors.push(
      this.fb.group({
        name: ['', Validators.required],
        idNo: ['', Validators.required],
      })
    );
  }

  removeGuarantor(index: number): void {
    this.guarantors.removeAt(index);
  }

  loadLoanData(id: string | null): void {
    const loans = JSON.parse(localStorage.getItem('loans') || '[]');
    const loan = loans.find((loan: any) => loan.id === id);

    if (loan) {
      const [firstName, lastName] = loan.borrower.split(' ');
      this.loanForm.patchValue({
        firstName,
        lastName,
        amount: loan.amount,
        startDate: loan.start_date ? new Date(loan.start_date) : null,
        maturityDate: loan.maturity_date ? new Date(loan.maturity_date) : null,
        interestRate: loan.interest_rate,
      });

      if (loan.guarantors) {
        loan.guarantors.forEach((guarantor: any) => {
          this.guarantors.push(this.fb.group(guarantor));
        });
      }
    }
  }

  onSubmit(): void {
    if (this.loanForm.valid) {
      const updatedLoan = this.loanForm.value;
      console.log({ updatedLoan }, '___UPDATE');
      const loans = JSON.parse(localStorage.getItem('loans') || '[]');
      const loanIndex = loans.findIndex((loan: any) => loan.id === this.loanId);

      if (loanIndex > -1) {
        loans[loanIndex] = {
          ...loans[loanIndex],
          ...{
            borrower: `${updatedLoan.firstName} ${updatedLoan.lastName}`,
            start_date: updatedLoan.startDate,
            interest_rate: updatedLoan.interestRate,
            maturity_date: updatedLoan.maturityDate,
            guarantors: updatedLoan.guarantors,
            amount: updatedLoan.amount,
          },
        };

        localStorage.setItem('loans', JSON.stringify(loans));
      }

      this.router.navigate(['/loans']);
    }
  }

  handleUpdateStatus(): void {
    if (this.loanForm.valid && this.loanId) {
      const loan = this.loanForm.value;
      const currentDate = new Date();
      const maturityDate = new Date(loan.maturityDate);
      let status = 'current';

      if (currentDate > maturityDate) {
        status = 'overdue';
      }

      const loans = JSON.parse(localStorage.getItem('loans') || '[]');
      const loanIndex = loans.findIndex((loan: any) => loan.id === this.loanId);

      if (loanIndex > -1) {
        loans[loanIndex] = {
          ...loans[loanIndex],
          status: status,
        };

        localStorage.setItem('loans', JSON.stringify(loans));
      }

      this.dialogRef.close();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
