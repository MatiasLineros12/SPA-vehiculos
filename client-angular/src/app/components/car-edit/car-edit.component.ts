import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { User } from '../../Models/user';
import { Car } from '../../Models/car';
import { UserService } from '../../services/user.service';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: '../car-new/car-new.component.html', //reutilizacion de vista html 
  providers: [ UserService, CarService ]
})
export class CarEditComponent implements OnInit {

  	public car: any;
  	public page_title: string;
  	public status_car:string;
  	public token:string;
    public errores:any;

	constructor(
 		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _carService: CarService
	) { 
		this.page_title = 'Editar vehiculo';
  		this.car = Car;
  		this.status_car = '';
  		this.token = this._userService.getToken();
	}

  	ngOnInit() {
  		this._route.params.subscribe(params => {
	  		let id = +params['id'];
  			this.getCar(id);
  		});
  	}

  	onSubmit(form:any){
  		console.log(this.car.id);
  		this._carService.update(this.token, this.car, this.car.id).subscribe(
  			response => {
  				console.log(response);
  				if(response.status == 'success'){
  					this.status_car = 'success';
  					this.car = response.car;
  					this._router.navigate(['/vehiculo/'+this.car.id]);
  				}else{
  					this.status_car = 'error';
  				}
  			},
  			error => {
  				console.log(<any>error);
  				this.status_car = 'error';
          this.errores = error.error.title;
  			}
  		);
  	}

  	getCar(id:number){
	  	this._carService.getCar(id).subscribe(
	  		response =>{
	 			if(response.status == 'success'){
 					this.car = response.car;
  					this.page_title = 'Editar ' + this.car.title;
  					console.log(this.car);
  				}else{
  					this._router.navigate(['home']);
  				}
  			}, 
  			error => {
  				console.log(<any>error);
  			}
  		)
  	}

}
