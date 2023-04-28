import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParameterListComponent } from './components/parameter-list/parameter-list.component';
import { DeviceParameterComponent } from './components/parameter-list/parameter/parameter.component';
import { ParameterService } from './services/parameter.service';

@NgModule({
  declarations: [
    AppComponent,
    ParameterListComponent,
    DeviceParameterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    ParameterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
