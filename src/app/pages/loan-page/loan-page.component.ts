// src/app/pages/loan-page/loan-page.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoansService } from '../../services/loans.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { download, generateCsv} from 'export-to-csv'
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-loan-page',
  templateUrl: './loan-page.component.html',
  styleUrls: ['./loan-page.component.sass'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButton, MatInput]
})
export class LoanPageComponent implements OnInit {
  loans$!: Observable<any[]>;
  filteredLoans$!: any[];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private loansService: LoansService, private router: Router) {}

  ngOnInit(): void {
    this.loans$ = this.loansService.fetchLoans();
    this.loans$.pipe(
      map(loans => this.filterAndPaginate(loans))
    ).subscribe((loans) => {
      this.filteredLoans$ = loans
    });
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
    this.loans$.pipe(
      map(loans => this.filterAndPaginate(loans))
    ).subscribe((loans) => {
      this.filteredLoans$ = loans
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loans$.pipe(
      map(loans => this.filterAndPaginate(loans))
    ).subscribe((loans) => {
      this.filteredLoans$ = loans
    });
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

  navigateToCreateLoan(): void {
    this.router.navigate(['/loans/new']);
  }

  handleGenerateReport() {
    const config = {
      useKeysAsHeaders: true
    }
    const csv = generateCsv(config)(this.filteredLoans$);

    return download(config)(csv)
  }
}
