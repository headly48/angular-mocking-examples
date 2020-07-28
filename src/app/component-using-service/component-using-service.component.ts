import { Component, OnInit } from '@angular/core';
import { CookieService, Cookie } from '../cookie-service.service';

@Component({
  selector: 'app-component-using-service',
  templateUrl: './component-using-service.component.html',
  styleUrls: ['./component-using-service.component.scss']
})
export class ComponentUsingServiceComponent implements OnInit {
  cookies: Cookie[];

  constructor(private cookiesService: CookieService) { }

  ngOnInit(): void {

  }

  addCookie(cookie: Cookie): void {
    
    this.cookiesService.addCookie(cookie);
  }

  AddAllCookies(cookies: Cookie[]): void {
    cookies.forEach((cookie) => {
      this.cookiesService.addCookie(cookie);
      this.cookiesService.addCookie(cookie);
      this.cookiesService.addCookie(cookie);
    });
  }

  refreshCookies(): void {

    this.cookies = this.cookiesService.getCookies();
  }
}
