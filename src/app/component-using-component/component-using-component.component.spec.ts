import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent, MockedComponent, MockRender, ngMocks, MockedComponentFixture } from 'ng-mocks';
 
import { ComponentUsingComponentComponent, SampleComponent, SampleNgContentComponent } from './component-using-component.component';

fdescribe('ComponentUsingComponentComponent', () => {
  let component: ComponentUsingComponentComponent;
  let fixture: ComponentFixture<ComponentUsingComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentUsingComponentComponent, MockComponent(SampleComponent), MockComponent(SampleNgContentComponent) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentUsingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Verify input in mocked component', () => {
    const mockedComponent = ngMocks.find<SampleComponent>(fixture.debugElement, 'app-sample-component')
      .componentInstance;

    expect(mockedComponent.cookie).toBe(undefined);
    
    component.setCookie();

    // Must trigger detect changes for angular to detect the input change
    fixture.detectChanges();

    expect(mockedComponent.cookie).toEqual({
      vegan: true,
      vegetarian: true,
      ingredients: ['Choc Chips']
    });
  });


  it('Verify triggering output in mocked component', () => {
    const mockedComponent = ngMocks.find<SampleComponent>(fixture.debugElement, 'app-sample-component')
      .componentInstance;

    mockedComponent.cookieUpdated.emit({
      vegan: true,
      vegetarian: true,
      ingredients: ['Choc Chips']
    });

    // Must trigger detect changes for angular to detect the output change
    fixture.detectChanges();

    expect(component.cookieUpdated).toBeTrue();
  });

  it('should render something inside of the dependency component', () => {
    // because component does have @ContentChild we need to render them first with proper context.
    const mockedComponent = ngMocks.find<SampleNgContentComponent>(fixture.debugElement, 'app-sample-ng-content');
    (mockedComponent.componentInstance as any).__render('something');

    fixture.detectChanges();

    const mockedNgTemplate = ngMocks.find(mockedComponent, '[data-key="something"]').nativeElement.innerHTML;
    expect(mockedNgTemplate).toContain('<p>inside template</p>');
  });
});
