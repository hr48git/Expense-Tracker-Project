import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';   // 👈 ADD THIS

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // 👈 ADD HERE
  templateUrl: './add-expense.html',
  styleUrls: ['./add-expense.css']
})
export class AddExpenseComponent {

  title = '';
  amount: number | null = null;
  expenseDate = '';

  expenseType: string | null = null;
  categoryId: number | null = null;

  message = '';

  constructor(
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  addExpense() {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      this.message = 'Please login again';
      this.cdr.detectChanges();
      return;
    }

    if (!this.expenseType || !this.categoryId || !this.amount) {
      this.message = 'Please fill all required fields';
      this.cdr.detectChanges();
      return;
    }

    const expense = {
      title: this.title || 'Expense',
      amount: this.amount,
      expenseDate: this.expenseDate,
      expenseType: this.expenseType,
      user: { userId: Number(userId) },
      category: { categoryId: this.categoryId }
    };

    this.api.addExpense(expense).subscribe({
      next: () => this.router.navigate(['/expenses']),
      error: (err) => {
        this.message = err?.error || 'Failed to add expense';
        this.cdr.detectChanges();
      }
    });
  }
}
