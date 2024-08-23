import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import loans from '../../app/data/loans.json'


@Injectable({
  providedIn: 'root'
})
export class LoansService {

  constructor() { }

  fetchLoans(): Observable<any[]> {
    return of(loans)
  }
}
