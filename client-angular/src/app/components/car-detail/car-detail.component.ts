import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { User } from '../../Models/user';
import { Car } from '../../Models/car';
import { UserService } from '../../services/user.service';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  providers: [ UserService, CarService ]
})
export class CarDetailComponent implements OnInit {

	public car: any;

  constructor(
  	private _route: ActivatedRoute,
	private _router: Router,
	private _userService: UserService,
	private _carService: CarService
  ) { 
  	this.car = Car;
  }

  ngOnInit() {
  	this.getCar();
  }

  getCar(){
  	this._route.params.subscribe(params => {
  		let id = +params['id'];

  		this._carService.getCar(id).subscribe(
  			response =>{
  				if(response.status == 'success'){
  					this.car = response.car;
  					console.log(this.car);
  				}else{
  					this._router.navigate(['home']);
  				}
  			}, 
  			error => {
  				console.log(<any>error);
  			}
  		)
  	});
  }

}
