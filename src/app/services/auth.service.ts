import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: string | null = null;

  setUser(user: string) {
    this.currentUser = user;
  }

  getUser(): string | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  logout() {
    this.currentUser = null;
  }
}
