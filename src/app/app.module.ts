import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from './cookie-service.service';
import { AppComponent } from './app.component';
import { ComponentUsingServiceComponent } from './component-using-service/component-using-service.component';
import { ComponentUsingDirectiveComponent } from './component-using-directive/component-using-directive.component';
import { ComponentUsingComponentComponent, SampleComponent, SampleNgContentComponent } from './component-using-component/component-using-component.component';

@NgModule({
  declarations: [
    AppComponent,
    SampleComponent,
    SampleNgContentComponent,
    ComponentUsingServiceComponent,
    ComponentUsingDirectiveComponent,
    ComponentUsingComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
