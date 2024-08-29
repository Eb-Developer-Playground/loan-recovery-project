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
    MatNativeDateModule,
    MatDatepickerModule,
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
      console.log(this.loanForm.value);
      this.router.navigate(['/loans']);
    }
  }
}
