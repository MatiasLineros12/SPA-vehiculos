import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CarService } from '../../services/car.service';
import { Car } from '../../Models/car';

@Component({
	selector: 'default',
	templateUrl: './default.component.html',
	providers: [UserService, CarService]
})
export class DefaultComponent implements OnInit{
	public title:string;
	public cars: Array<Car>;
	public token:string;

	constructor(
		private _route_: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _carService: CarService,
	) {
		this.title = 'Vehículos';
		this.cars = [];
		this.token =  this._userService.getToken();
	}

	ngOnInit(){
		console.log('home cargado');
		this.getCars();
	}

	getCars(){
		this._carService.getCars().subscribe(
			response => {
				console.log(response)
				if(response.status = 'success'){
					this.cars = response.cars;
				}
			}, 
			error => {
				console.log(error);
			}
		);
	}

	deleteCar(id:number){
		this._carService.delete(this.token, id).subscribe(
			response => {
				this.getCars();
			}, 
			error => {
				console.log(<any>error);
			}
		);
	}
}

//para dar de alta el componente, debe registrarse en app.module.ts