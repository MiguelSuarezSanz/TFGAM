import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthUtilsService {
  getCurrentUserId(): number {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser.Id || 0;
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
    return 0;
  }

  isAdmin(): boolean {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser.Privilegios === 'admin';
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
    return false;
  }
}