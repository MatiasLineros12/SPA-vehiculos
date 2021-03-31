<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helpers\JwtAuth;
use App\User;

class UserController extends Controller
{
    public function register(Request $request){
    	//echo 'Accion registro'; die();

    	//recoger post
    	$json = $request->input('json', null);
    	$params = json_decode($json);

    	//variables
    	$email = (!is_null($json) && isset($params->email)) ? $params->email : null;
    	$name = (!is_null($json) && isset($params->name)) ? $params->name : null;
    	$surname = (!is_null($json) && isset($params->surname)) ? $params->surname : null;
    	$role = 'ROLE_USER';
    	$password = (!is_null($json) && isset($params->password)) ? $params->password : null;

    	if(!is_null($email) && !is_null($password) && !is_null($name)){
    		$user = new User();
    		$user->email = $email;
    		$user->name = $name;
    		$user->surname = $surname;
    		$user->role = $role;
    		$user->password = hash('sha256', $password);
    		//comprobar que no exista
    		$isset_user = User::where('email', $email)->first();

    		if(!$isset_user){ //si no existe usuario en BD
    			$user->save(); //guarda
    			$data = array(
	    			'status' => 'success',
	    			'code' => 400,
	    			'message' => 'Usuario registrado correctamente',
    			);
    		}else{
    			$data = array(
	    			'status' => 'error',
	    			'code' => 400,
	    			'message' => 'Usuario duplicado',
    			);
    		}

    		
    	}else{
    		$data = array(
    			'status' => 'error',
    			'code' => 400,
    			'message' => 'Usuario no creado',
    		);
    	}

    	return response()->json($data, 200);
    }

    public function login(Request $request){
    	$jwtAuth = new JwtAuth();
        
        //recibir por post
        $json = $request->input('json', null); //almacena lo que llega por json
        $params = json_decode($json); //almacena los parametros decodificando el json

        $email = (!is_null($json) && isset($params->email)) ? $params->email : null;
        $password = (!is_null($json) && isset($params->password)) ? $params->password : null;
        $getToken = (!is_null($json) && isset($params->gettoken)) ? $params->gettoken : null;

        //cifrar pwd
        $pwd = hash('sha256', $password);

        if(!is_null($email) && !is_null($password) && ($getToken == null || $getToken == 'false')){
            $signup = $jwtAuth->signup($email, $pwd); //retorna jwt codificado
        }elseif($getToken != null){ //si llega variable getToken
            $signup = $jwtAuth->signup($email, $pwd, $getToken); //retorna jwt decodificado
        }else{
            return $signup = array('status' => 'error', 'message' => 'envia datos por post');
        }

        return response()->json($signup, 200);
    }
}
