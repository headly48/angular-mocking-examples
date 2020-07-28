import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentUsingDirectiveComponent } from './component-using-directive.component';

describe('ComponentUsingDirectiveComponent', () => {
  let component: ComponentUsingDirectiveComponent;
  let fixture: ComponentFixture<ComponentUsingDirectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentUsingDirectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentUsingDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
