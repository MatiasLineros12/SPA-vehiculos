import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Car } from '../../Models/car';
import { UserService } from '../../services/user.service';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-new',
  templateUrl: './car-new.component.html',
  styleUrls: ['./car-new.component.css'],
  providers: [UserService, CarService]
})
export class CarNewComponent implements OnInit {
	public page_title: string;
	public car:Car;
	public token:any;
	public identity:any;
	public status_car:string;
	public errores:any;
	
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _carService: CarService
	) { 
		this.page_title = 'Crear nuevo vehículo';
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
		this.car = new Car(1,'','',1,'',null,null);
		this.status_car = '';
	}

	ngOnInit() {
		if(this.identity==null){
			this._router.navigate(['/login']);
		}else{
			//crea objeto coche
			this.car = new Car(1,'','',1,'',null,null);
		}
	}

	onSubmit(form:any){
		this._carService.create(this.car, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					//vaciar formulario
					this.status_car = 'success';
					this.car = response.car;
					form.reset();
				}else{
					//console.log(response.status);
					this.status_car = 'error';
					//console.log(response.error.title);
				}
			},
			error => {
				console.log(<any>error);
				console.log(error.error.title);
				this.errores = error.error.title;
				this.status_car = 'error';
			}
		);
	}

}
