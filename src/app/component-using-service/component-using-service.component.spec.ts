import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentUsingServiceComponent } from './component-using-service.component';
import { CookieService, Cookie } from '../cookie-service.service';
import { mock, instance, verify, reset, resetCalls, when, anything, capture } from 'ts-mockito';
import { of } from 'rxjs';

// Examples on how to use tsMockito
describe('ComponentUsingServiceComponent', () => {
  let component: ComponentUsingServiceComponent;
  let fixture: ComponentFixture<ComponentUsingServiceComponent>;

  let mockCookieService: CookieService;

  // NOTE: Mocks are create in a before each BEFORE the testbed is created.
  // If the mocks are not created in the before each then your tests will encounter random 
  // issues due to mocks not being reset before each test
  beforeEach(() => {
    mockCookieService = mock(CookieService);
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CookieService,
          useValue: instance(mockCookieService)
        }
      ],
      declarations: [ ComponentUsingServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentUsingServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // The alternative to defining the mocks in a before each is to instead reset each mock.
  // The downside to this is its often overlooked when extending tests and adding additional mocks causing randomness 
  beforeEach(() => {
    reset(mockCookieService);
  });

  it('Verifying service has been called', () => {
    component.refreshCookies();

    verify(mockCookieService.getCookies()).once();
    verify(mockCookieService.getCookies()).atLeast(1);
    verify(mockCookieService.getCookies()).atMost(1);
  });

  it('Verify service has been called and returns a value', () => {
    const testCookies: Cookie[] = [{
      vegan: false,
      vegetarian: false,
      ingredients: ['Flour']
    }];
    when(mockCookieService.getCookies()).thenReturn(testCookies);

    component.refreshCookies();
    
    verify(mockCookieService.getCookies()).once();
    expect(component.cookies).toBe(testCookies);
  });

  it('Verify service has been called and call a function', () => {
    const testCookies: Cookie[] = [{
      vegan: false,
      vegetarian: false,
      ingredients: ['Flour']
    }];
    when(mockCookieService.getCookies()).thenCall(() => {
      console.log('Function that will be called');
    });

    component.refreshCookies();
  });


  it('Verify service has been called with correct value', () => {
    const testCookie: Cookie = {
      vegan: false,
      vegetarian: false,
      ingredients: ['Flour']
    };

    component.addCookie(testCookie);
    
    verify(mockCookieService.addCookie(testCookie)).once();
  });

  it('Verify service has been called an available matcher', () => {
    const testCookie: Cookie = {
      vegan: false,
      vegetarian: false,
      ingredients: ['Flour']
    };

    component.addCookie(testCookie);
    
    verify(mockCookieService.addCookie(anything())).once();

    // Other available matchers

    // verify(mockCookieService.addCookie(anyOfClass<T>())).once();
    // verify(mockCookieService.addCookie(anyFunction())).once();
    // verify(mockCookieService.addCookie(anyNumber())).once();
    // verify(mockCookieService.addCookie(anyString())).once();
    // verify(mockCookieService.addCookie(anything())).once();
    // verify(mockCookieService.addCookie(between(1, 10))).once();

    // verify(mockCookieService.addCookie(between(1, 10))).once();
    // verify(mockCookieService.addCookie(deepEqual(testCookie))).once();
    // verify(mockCookieService.addCookie(notNull())).once();
    // verify(mockCookieService.addCookie(strictEqual(testCookie))).once();
    // verify(mockCookieService.addCookie(match(RegExp| string))).once();
    // verify(mockCookieService.addCookie(objectContaining(RegExp| string))).once();
  });

  it('Multiple returns', () => {
    const testCookie: Cookie = {
      vegan: false,
      vegetarian: false,
      ingredients: ['Flour']
    };

    when(mockCookieService.getCookies()).thenReturn([]).thenReturn([testCookie]);

    component.refreshCookies();

    expect(component.cookies).toEqual([]);

    component.refreshCookies();

    expect(component.cookies).toEqual([testCookie]);
  })

  it('Capturing method args', () => {

    // To get the arguments the method was called with

    component.addCookie(mock<Cookie>());

    const [firstArg, secondArg] = capture<Cookie, void>(mockCookieService.addCookie).last();

    console.log('Captured Arg', firstArg);
    
    // Can use the methods first, second, third, byCallIndex, beforeLast, last to get the arguments
  });

  it('Should verify service has been called multiple times', () => {
    component.refreshCookies();

    verify(mockCookieService.getCookies()).once();
  });

  it('Should verify service has been called multiple times with correct values', () => {
    expect(component).toBeTruthy();
  });
});
