import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // ✅ FIX HERE
  templateUrl: './expense-list.html',
  styleUrls: ['./expense-list.css']
})
export class ExpenseListComponent implements OnInit {

  expenses: any[] = [];
  total = 0;

  userName = '';

  showFilters = false;
  selectedCategoryId: number | null = null;
  expenseType: string | null = null;
  fromDate = '';
  toDate = '';
  today = new Date().toISOString().split('T')[0];

  constructor(
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userName = localStorage.getItem('userName') || '';
    this.loadData();
  }

  loadData() {
    const userId = Number(localStorage.getItem('userId'));

    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.api.getExpenses(userId).subscribe((data: any[]) => {
      this.expenses = data;
      this.calculateTotal();   // ✅ initial total
      this.cdr.detectChanges();
    });
    
  }

  calculateTotal() {
    this.total = this.expenses.reduce(
      (sum, e) => sum + (e.amount || 0),
      0
    );
  }
  
  applyFilters() {
    const userId = Number(localStorage.getItem('userId'));
  
    // CATEGORY FILTER (backend)
    if (this.selectedCategoryId !== null) {
      this.api
        .getExpensesByCategory(userId, this.selectedCategoryId)
        .subscribe((data: any[]) => {
          this.expenses = data;
  
          // 🔥 apply expense type filter on top (optional)
          if (this.expenseType) {
            this.expenses = this.expenses.filter(
              e => e.expenseType === this.expenseType
            );
          }
  
          this.calculateTotal();      // ✅ UPDATE TOTAL
          this.cdr.detectChanges();
        });
      return;
    }
  
    // DATE FILTER (backend)
    if (this.fromDate && this.toDate) {
      this.api
        .getExpensesByDate(userId, this.fromDate, this.toDate)
        .subscribe((data: any[]) => {
          this.expenses = data;
  
          if (this.expenseType) {
            this.expenses = this.expenses.filter(
              e => e.expenseType === this.expenseType
            );
          }
  
          this.calculateTotal();      // ✅ UPDATE TOTAL
          this.cdr.detectChanges();
        });
      return;
    }
  
    // ONLY EXPENSE TYPE FILTER (frontend)
    if (this.expenseType) {
      this.expenses = this.expenses.filter(
        e => e.expenseType === this.expenseType
      );
      this.calculateTotal();          // ✅ UPDATE TOTAL
      return;
    }
  
    // NO FILTERS → LOAD ALL
    this.loadData();
  }
  
  

  clearFilters() {
    this.selectedCategoryId = null;
    this.expenseType = null;
    this.fromDate = '';
    this.toDate = '';
    this.loadData();
  }

  deleteExpense(id: number) {
    this.api.deleteExpense(id).subscribe(() => this.loadData());
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
}
