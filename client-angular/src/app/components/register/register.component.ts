import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../Models/user'; 
import { UserService } from '../../services/user.service';

@Component({
	selector: 'register',
	templateUrl: './register.component.html',
	providers: [UserService]
})
export class RegisterComponent implements OnInit{
	public title:string;
	public user: User;
	public status:string;

	constructor(
		private _route_: ActivatedRoute,
		private _router: Router,
		private _userService: UserService
	) {
		this.title = '¡Registrate aca!';
		this.user = new User(1,'ROLE_USER','','','','','');
		this.status = '';
	}

	ngOnInit(){
		console.log('register cargado');
	}

	onSubmit(form:any){
		this._userService.register(this.user).subscribe(
			response => {
				if(response.status == 'success'){
					this.status = response.status;
					//vaciar formulario
					this.user = new User(1,'ROLE_USER','','','','','');
					form.reset();
				}else{
					this.status = 'error';
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}
}

//para dar de alta el componente, debe registrarse en app.module.ts