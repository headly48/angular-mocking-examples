import { Component, OnInit, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { Cookie } from '../cookie-service.service';



@Component({
  selector: 'app-sample-component',
  template: '<p>This is a sample component</p>'
})
export class SampleComponent implements OnInit {

  @Input()
  cookie: Cookie = null;

  @Output()
  cookieUpdated: EventEmitter<Cookie> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
}


@Component({
  selector: 'app-sample-ng-content',
  template: 'dependency'
})
export class SampleNgContentComponent {

  @ContentChild('something', { static: false })
  injectedSomething: TemplateRef<{}>;
}





@Component({
  selector: 'app-component-using-component',
  templateUrl: './component-using-component.component.html'
})
export class ComponentUsingComponentComponent implements OnInit {

  cookieUpdated = false;
  cookie: Cookie;

  constructor() { }

  ngOnInit(): void {
  }

  setCookie(): void {

    this.cookie = {
      vegan: true,
      vegetarian: true,
      ingredients: ['Choc Chips']
    }
  }

  updateCookie(cookie: Cookie): void {
    this.cookieUpdated = true;
  }
}
