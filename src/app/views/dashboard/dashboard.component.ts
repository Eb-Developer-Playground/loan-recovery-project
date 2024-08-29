import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import loans from '../../data/loans.json'
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgxChartsModule, MatIcon],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  userCount: number = 0;
  activeLoansCount: number = 0;
  inactiveLoansCount: number = 0;
  writtenOffLoansCount: number = 0;
  loans: any[] = []

  loanChartData: any[] = [];
  colorScheme: any = {
    domain: ['#1E90FF', '#00C851', '#FFBB33', '#FF4444']  // Define the color scheme here
  };

  constructor() { 
    
  }

  ngOnInit(): void {
    this.fetchDashboardData();
    this.initializeChartData();
  }

  fetchDashboardData(): void {
    this.userCount = 100;
    this.activeLoansCount = 50;
    this.inactiveLoansCount = 30;
    this.writtenOffLoansCount = 10;
  }

  initializeChartData(): void {
    this.loanChartData = [
      { name: 'Active Loans', value: this.activeLoansCount },
      { name: 'Inactive Loans', value: this.inactiveLoansCount },
      { name: 'Written Off Loans', value: this.writtenOffLoansCount }
    ];
  }
}
