import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParameterListComponent } from './components/parameter-list/parameter-list.component';
import { DeviceParameterComponent } from './components/parameter-list/parameter/parameter.component';
import { HeaderComponent } from './core/components/header/header.component';
import { HttpModule } from './core/modules/http.module';
import { ParameterService } from './services/parameter.service';

const TOASTR_CONFIG = {
  timeOut: 10000,
  positionClass: 'toast-bottom-right',
  preventDuplicates: false
}

@NgModule({
  declarations: [
    AppComponent,
    ParameterListComponent,
    DeviceParameterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    FormsModule,
    HttpModule.forRoot({ environment }),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(TOASTR_CONFIG)
  ],
  providers: [
    ParameterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
