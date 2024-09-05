import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { differenceInMonths } from 'date-fns';

@Component({
  selector: 'app-new-loan',
  templateUrl: './new-loan.component.html',
  styleUrls: ['./new-loan.component.sass'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatNativeDateModule
  ]
})
export class NewLoanComponent implements OnInit {
  loanForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loanForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      income: [null],
      startDate: [null],
      maturityDate: [null],
      amount: [null, Validators.required],
      interestRate: [null, Validators.required], 
      term_months: [{ value: '', disabled: true }],
      guarantors: this.fb.array([]),
      consent: [false, Validators.requiredTrue]
    });
  }

  get guarantors(): FormArray {
    return this.loanForm.get('guarantors') as FormArray;
  }

  addGuarantor(): void {
    this.guarantors.push(this.fb.group({
      name: ['', Validators.required],
      idNo: ['', Validators.required]
    }));
  }

  removeGuarantor(index: number): void {
    this.guarantors.removeAt(index);
  }

  onSubmit(): void {
    if (this.loanForm.valid) {
      const formValues = this.loanForm.value;
      const localLoans = localStorage.getItem('loans');
      const oldLoans = localLoans ? JSON.parse(localLoans) : [];
      const isOverdue = new Date(formValues.maturityDate) < new Date();
      const newLoan = {
        id: Math.floor(Math.random() * 100),
        borrower: `${formValues.firstName} ${formValues.lastName}`,
        amount: formValues.amount,
        interest_rate: formValues.interestRate,
        term_months: formValues.term_months,
        start_date: formValues.startDate,
        maturity_date: formValues.maturityDate,
        status: isOverdue ? 'overdue' : 'current'
      };
      const newLoansList = [newLoan, ...oldLoans];

      localStorage.setItem('loans', JSON.stringify(newLoansList));

      this.router.navigate(['/loans']);
    }
  }
}
