import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CovidDataComponent } from './covid-data/covid-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterceptorService } from './services/interceptor.service';
import { LargeNumberPipe } from './pipes/large-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CovidDataComponent,
    LargeNumberPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
