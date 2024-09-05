import { Pipe, PipeTransform } from '@angular/core';

function monthsBetweenDates(date1: Date, date2: Date) {
    console.log({date1,date2})
 
  if (date1 > date2) {
    [date1, date2] = [date2, date1];
    console.log("hello")
  }


  
  const year1 = date1.getFullYear();
  const month1 = date1.getMonth();
  const year2 = date2.getFullYear();
  const month2 = date2.getMonth();

 
  const yearDifference = year2 - year1;
  const monthDifference = month2 - month1;

 
  return yearDifference * 12 + monthDifference;
}

@Pipe({
  name: 'loanTerm',
  standalone: true,
})
export class LoanTermPipe implements PipeTransform {
  transform(loan: any, ...args: any[]): number {
    return monthsBetweenDates(
      new Date(loan.start_date),
      new Date(loan.maturity_date)
    );
  }
}
