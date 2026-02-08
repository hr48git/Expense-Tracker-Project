import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-visualize',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visualize.component.html',
  styleUrls: ['./visualize.component.css']
})
export class VisualizeComponent implements OnInit {

  expenses: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) return;

    this.api.getExpenses(userId).subscribe((data: any[]) => {
      this.expenses = data;
      this.createTypeChart();
      this.createCategoryChart();
    });
  }

  createTypeChart() {
    const personal = this.expenses
      .filter(e => e.expenseType === 'PERSONAL')
      .reduce((sum, e) => sum + e.amount, 0);

    const organizational = this.expenses
      .filter(e => e.expenseType === 'ORGANIZATIONAL')
      .reduce((sum, e) => sum + e.amount, 0);

    new Chart('typeChart', {
      type: 'doughnut',
      data: {
        labels: ['Personal', 'Organizational'],
        datasets: [{
          data: [personal, organizational],
          backgroundColor: ['#0d6efd', '#198754']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  createCategoryChart() {
    const categoryMap: any = {};

    this.expenses.forEach(e => {
      const name = e.category?.categoryName || 'Others';
      categoryMap[name] = (categoryMap[name] || 0) + e.amount;
    });

    new Chart('categoryChart', {
      type: 'bar',
      data: {
        labels: Object.keys(categoryMap),
        datasets: [{
          label: 'Amount',
          data: Object.values(categoryMap),
          backgroundColor: '#0d6efd'
        }]
      },
      options: {
        responsive: true,
        indexAxis: 'y',   // 🔥 horizontal bars (looks better)
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}
