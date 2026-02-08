import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/register`, data);
  }

  // ✅ FIXED RETURN TYPES
  getExpenses(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/expenses?userId=${userId}`);
  }

  getTotal(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/expenses/total?userId=${userId}`);
  }

  getExpensesByCategory(userId: number, categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/expenses/by-category?userId=${userId}&categoryId=${categoryId}`
    );
  }

  getExpensesByDate(userId: number, from: string, to: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/expenses/by-date?userId=${userId}&from=${from}&to=${to}`
    );
  }

  addExpense(data: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/expenses`,
      data,
      { responseType: 'text' }   // ✅ IMPORTANT
    );
  }
  

  deleteExpense(expenseId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/expenses/${expenseId}`);
  }
}
