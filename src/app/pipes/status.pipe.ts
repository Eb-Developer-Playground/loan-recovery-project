import { Pipe, PipeTransform } from '@angular/core';

function dateIsInPast(dateToCheck: Date): boolean {
  const currentDate = new Date();
  const dateToCheckObj = new Date(dateToCheck);
  return dateToCheckObj.getTime() < currentDate.getTime();
}

@Pipe({
  name: 'status',
  standalone: true,
})
export class LoanStatusPipe implements PipeTransform {
  transform(loan: any, ...args: any[]): string {
    if(dateIsInPast(new Date(loan.maturity_date))) {
        return 'overdue'
    }
    return loan.status.toString();
  }
}
