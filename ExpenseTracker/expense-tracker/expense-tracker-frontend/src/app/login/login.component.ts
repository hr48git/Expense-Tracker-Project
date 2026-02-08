import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';

  message = '';          // error
  successMessage = '';   // success

  constructor(
    private api: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  login() {
    this.api.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        this.message = '';
        this.successMessage = 'Login successful 🎉';
      
        localStorage.setItem('userId', res.userId);
        localStorage.setItem('userName', res.name);   // 👈 ADD THIS
      
        this.cdr.detectChanges();
      
        setTimeout(() => {
          this.router.navigate(['/expenses']);
        }, 1000);
      }
      ,
      error: (err) => {
        console.log(err);
        this.successMessage = '';
        this.message = err?.error || 'Invalid credentials';
        this.cdr.detectChanges();
      }
    });
  }
}
