import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DefaultComponent } from './components/default/default.component'; //home
import { CarNewComponent } from './components/car-new/car-new.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';


const routes: Routes = [
	{path:'login', component: LoginComponent},
	{path:'logout/:sure', component: LoginComponent},
	{path:'register', component: RegisterComponent},
	{path:'', component: DefaultComponent},
	{path:'home', component: DefaultComponent},
	{path:'crear-vehiculo', component: CarNewComponent},
	{path:'editar-vehiculo/:id', component: CarEditComponent},
	{path:'vehiculo/:id', component: CarDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
