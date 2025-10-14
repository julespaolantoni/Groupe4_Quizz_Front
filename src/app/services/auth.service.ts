import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private adminLoggedIn = false;

  login(email: string, password: string): boolean {
    // Identifiants admin factices
    if (email === 'admin@site.com' && password === 'admin123') {
      this.adminLoggedIn = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.adminLoggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.adminLoggedIn;
  }
}
