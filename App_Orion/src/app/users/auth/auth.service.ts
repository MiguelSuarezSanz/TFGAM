import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isAdmin(): boolean {
    if (typeof window === 'undefined' || !window.localStorage) {
      console.warn('localStorage is not available in this environment.');
      return false;
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      return user.Privilegios === 'Admin';
    }
    return false;
  }
}