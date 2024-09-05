// src/app/services/loans.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoansService {
  constructor() { }

  fetchLoans(): Observable<any[]> {
    const localLoans = localStorage.getItem('loans');
    let loans = [];
    if (localLoans) {
      loans = JSON.parse(localLoans);
    }
    return of(loans);
  }

  updateLoans(loans: any[]): void {
    localStorage.setItem('loans', JSON.stringify(loans));
  }
}
