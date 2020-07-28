import { Injectable } from '@angular/core';

export interface Cookie {
  vegan: boolean;
  vegetarian: boolean;
  ingredients: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private cookies: Cookie[] = [];

  constructor() {

  }

  addCookie(cookie: Cookie): void {
    this.cookies.push(cookie);
  }

  getCookies(): Array<Cookie> {
    return this.cookies;
  }
}
