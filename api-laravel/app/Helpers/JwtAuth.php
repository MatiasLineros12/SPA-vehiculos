<?php
namespace App\Helpers;

use Firebase\JWT\JWT;
use iluminate\Support\Facades\DB;
use App\User;

class JwtAuth{

	public $key;

	public function __construct(){
		$this->key = 'esta-es-mi-clave-secreta-12';
	}

	public function signup($email, $password, $getToken = null){
		$user = User::where(
			array(
				'email' => $email,
				'password' => $password
			))->first();

		$signup = false;
		if(is_object($user)){
			$signup = true;
		}

		if($signup) {
			$token = array( //genera token
				'sub' => $user->id,
				'email' => $user->email,
				'name' => $user->name,
				'surname' => $user->surname,
				'iat' => time(),
				'exp' => time() + (7 * 24 * 60 * 60)
			);

			$jwt = JWT::encode($token, $this->key, 'HS256'); //codifica
			$decoded = JWT::decode($jwt, $this->key, array('HS256')); //decodifica

			if(is_null($getToken)){ //si no existe variable getToken
				return $jwt; //retorna el codificado
			}else{ //si existe getToken
				return $decoded; //retorna el decodificado
			}

		}else{
			//error
			return array('status' => 'error', 'message' => 'Login ha fallado');
		}
	}

	public function checkToken($jwt, $getIdentity=false){
		$auth = false;

		try{
			$decoded = JWT::decode($jwt, $this->key, array('HS256')); //intenta decodificar
		}catch(\UnexpectedValueException $e){
			$auth = false;
		}catch(\DomainException $e){
			$auth = false;
		}

		if(isset($decoded) && is_object($decoded) && isset($decoded->sub)){
			$auth = true; //autorizado
		}else{
			$auth = false;
		}

		if($getIdentity){ //si el getIdentity es true, para identificar al usuario
			return $decoded; //retorna decodificado
		}

		return $auth; //retorna true o false
	}

}
?>