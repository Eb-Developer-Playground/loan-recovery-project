// src/app/pages/loan-page/loan-page.component.ts
import { Component, OnInit } from '@angular/core';
import { LoansService } from '../../services/loans.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-loan-page',
  templateUrl: './loan-page.component.html',
  styleUrls: ['./loan-page.component.sass'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor]
})
export class LoanPageComponent implements OnInit {
  loans$!: Observable<any[]>;
  filteredLoans$!: Observable<any[]>;
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private loansService: LoansService) {}

  ngOnInit(): void {
    this.loans$ = this.loansService.fetchLoans();
    this.filteredLoans$ = this.loans$.pipe(
      map(loans => this.filterAndPaginate(loans))
    );
  }

  filterAndPaginate(loans: any[]): any[] {
    const filtered = loans.filter(loan =>
      loan.borrower.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return filtered.slice(startIndex, startIndex + this.pageSize);
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.filteredLoans$ = this.loans$.pipe(
      map(loans => this.filterAndPaginate(loans))
    );
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.filteredLoans$ = this.loans$.pipe(
      map(loans => this.filterAndPaginate(loans))
    );
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'current':
        return 'current';
      case 'pending':
        return 'pending';
      case 'completed':
        return 'completed';
      case 'overdue':
        return 'overdue';
      default:
        return '';
    }
  }
}
