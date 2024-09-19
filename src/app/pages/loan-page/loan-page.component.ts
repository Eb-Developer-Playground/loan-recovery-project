import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoansService } from '../../services/loans.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { generateCsv } from 'export-to-csv'; 
import { LoanTermPipe } from '../../pipes/loan-term.pipe';
import { LoanStatusPipe } from '../../pipes/status.pipe';
import { EditLoanComponent } from './edit-loan/edit-loan.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-loan-page',
  templateUrl: './loan-page.component.html',
  styleUrls: ['./loan-page.component.sass'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButton,
    MatInput,
    MatIconButton,
    MatFormFieldModule,
    MatSelectModule,
    LoanTermPipe,
    LoanStatusPipe
  ]
})
export class LoanPageComponent implements OnInit {
  loans$: Observable<any[]>;
  filteredLoans$: Observable<any[]>;
  private loansSubject = new BehaviorSubject<any[]>([]);
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  pageNumbers: number[] = [];
  pageSizes: number[] = [5, 10, 15, 20, 25]; 
  totalPages!: number;

  constructor(
    private loansService: LoansService, 
    private router: Router, 
    private dialog: MatDialog
  ) {
    this.loans$ = this.loansSubject.asObservable();
    this.filteredLoans$ = this.loans$.pipe(
      map(loans => this.filterAndPaginate(loans))
    );
  }

  ngOnInit(): void {
    this.loadLoans();
  }

  private loadLoans(): void {
    this.loansService.fetchLoans().subscribe(
      (loans: any[]) => {
        this.loansSubject.next(loans);
        this.updatePagination(loans.length);
      },
      error => {
        console.error('Error fetching loans', error);
      }
    );
  }

  private updatePagination(totalItems: number): void {
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
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.filteredLoans$ = this.loans$.pipe(
        map(loans => this.filterAndPaginate(loans))
      );
    }
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.updatePagination(this.loansSubject.getValue().length);
  }

  getStatusClass(status: string): string {
    return status; 
  }

  navigateToCreateLoan(): void {
    this.router.navigate(['/loans/new']);
  }

  handleGenerateReport(): void {
    this.filteredLoans$.subscribe(loans => {
      const config = {
        useKeysAsHeaders: true
      };

      const csvGenerator = generateCsv(config);
      const csvContent = csvGenerator(loans);

      if (typeof csvContent !== 'string') {
        console.error('CSV generation did not return a string.');
        return;
      }

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'loans-report.csv';
      link.click();
    });
  }

  openDialog(loan: any): void {
    const dialogRef = this.dialog.open(EditLoanComponent, {
      data: loan
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadLoans();  
    });
  }
}
