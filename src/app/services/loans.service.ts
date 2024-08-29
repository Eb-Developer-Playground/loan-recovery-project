import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import loans from '../../app/data/loans.json'


@Injectable({
  providedIn: 'root'
})
export class LoansService {
  deleteLoan(id: number) {
    throw new Error('Method not implemented.');
  }
  addLoan(result: any) {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  fetchLoans(): Observable<any[]> {
    return of(loans)
  }
}
