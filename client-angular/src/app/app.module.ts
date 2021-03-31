import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms'; //para la gestion de formularios angular
import { LoginComponent } from './components/login/login.component'; //login
import { RegisterComponent } from './components/register/register.component'; //registro
import { DefaultComponent } from './components/default/default.component'; //home
import { HttpClientModule } from '@angular/common/http';
import { CarNewComponent } from './components/car-new/car-new.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    CarNewComponent,
    CarEditComponent,
    CarDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, //para la gestion de formularios angular
    HttpClientModule, //para peticiones http - web services
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
