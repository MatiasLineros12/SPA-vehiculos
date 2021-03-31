import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { User } from '../Models/user';

@Injectable()
export class UserService {
	public url:string;
	public identity:any;
	public token:any; 
	constructor(
		public _http: HttpClient
	) {
		this.url = GLOBAL.url;
		this.identity = '';
		this.token = '';
	}

	pruebas(){
		return 'hola mundo';
	}

	register(user:User): Observable<any>{
		let json = JSON.stringify(user); //let para declarar en TS
		let params = 'json='+json;

		//cabecera
		let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url+'register', params, {headers: headers});
	}

	signup(user:User, gettoken?:boolean): Observable<any>{ //para logearse
		if(gettoken!=null){
			user.gettoken = 'true';
		}

		let json = JSON.stringify(user); //let para declarar en TS
		let params = 'json='+json; //almacena en parametros el usuario llegado

		//cabecera
		let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url+'login', params, {headers: headers});
	}

	getIdentity(){ //para consultar al localStorage
		let lsi:any = localStorage.getItem('identity'); //obtiene lo q existe en local storage con nombre identity
		let identity = JSON.parse(lsi); //convierte en json
		if(identity != 'undefined'){ //si es diferente de idenfinido
			this.identity = identity;
		}else{
			this.identity = null;
		}
		return this.identity;
	}

	getToken(){ //para consultar al localStorage
		let lst:any = localStorage.getItem('token'); //obtiene lo q existe en local storage con nombre token
		let token = lst;
		if(token != 'undefined'){ //si es diferente de idenfinido
			this.token = token;
		}else{
			this.token = null;
		}
		return this.token;
	}


}