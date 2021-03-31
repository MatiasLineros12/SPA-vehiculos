<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Car;

class CarController extends Controller
{
    public function index(Request $request){
    	/*
        $hash = $request->header('Authorization', null);
    	$JwtAuth = new JwtAuth();
    	$checktoken = $JwtAuth->checkToken($hash);

    	if($checktoken){*/
    		$cars = Car::all()->load('user');
    		return response()->json(array(
    			'cars' => $cars,
    			'status' => 'success'
    		), 200);
    	/*
        }else{
    		echo 'Index cars - No autenticado'; die();
    	}
        */
    }

    public function show($id, Request $request){
    	/*
        $hash = $request->header('Authorization', null);
    	$JwtAuth = new JwtAuth();
    	$checktoken = $JwtAuth->checkToken($hash);

    	if($checktoken){*/
            $car = Car::find($id);
            if(is_object($car)){
                $car = Car::find($id)->load('user');
                return response()->json(array(
                    'car' => $car,
                    'status' => 'success'
                ), 200);
            }else{
                return response()->json(array(
                    'message' => 'Vehículo no existe',
                    'car' => $car,
                    'status' => 'error'
                ), 200);

            }
    		
    	/*
        }else{
    		echo 'Index cars - No autenticado'; die();
    	}
        */
    }

    public function store(Request $request){
    	$hash = $request->header('Authorization', null); //guarda hash
    	$JwtAuth = new JwtAuth();
    	$checktoken = $JwtAuth->checkToken($hash); //verificado token

    	if($checktoken){
    		//recoger datos por post
    		$json = $request->input('json', null); //guarda json q viene por request
    		$params = json_decode($json); //guarda parametros
    		$params_array = json_decode($json, true); //guarda parametros en array

    		//identificar usuario
    		$user = $JwtAuth->checkToken($hash, true); 
    		
    		//validacion
    		$validate = \Validator::make($params_array, [ //validator es eficaz para la validacion en una api
	    		'title' => 'required|min:5',
	   			'description' => 'required',
	   			'price' => 'required',
	   			'status' => 'required',
   			]);
    		
    		if($validate->fails()){
    			return response()->json($validate->errors(), 400);
    		}

    		//guardar coche
    		$car = new Car();
    		$car->title = $params->title;
    		$car->description = $params->description;
    		$car->status = $params->status;
    		$car->price = $params->price;
    		$car->user_id = $user->sub;
    		$car->save();

    		$data = array(
    			'car' => $car,
    			'status' => 'success',
    			'code' => 200,
    		);
    	}else{
    		//devolver error
    		$data = array(
    			'message' => 'login incorrecto',
    			'status' => 'error',
    			'code' => 300,
    		);
    	}
    	return response()->json($data, 200);
    }

    public function update($id, Request $request){
    	$hash = $request->header('Authorization', null);
    	$JwtAuth = new JwtAuth();
    	$checktoken = $JwtAuth->checkToken($hash);

    	if($checktoken){
    		//recoger parametros por post
    		$json = $request->input('json', null);
    		$params = json_decode($json);
    		$params_array = json_decode($json, true);

    		//validar datos
    		$validate = \Validator::make($params_array, [ //validator es eficaz para la validacion en una api
	    		'title' => 'required|min:5',
	   			'description' => 'required',
	   			'price' => 'required',
	   			'status' => 'required',
   			]);
    		
    		if($validate->fails()){
    			return response()->json($validate->errors(), 400);
    		}

    		//actuailizar coche

                //problemas al editar con la api..., muchos datos llegan
                //si llegan datos que no se modificaran, que seran iguales arroja error
                unset($params_array['id']);
                unset($params_array['user_id']);
                unset($params_array['created_at']);
                unset($params_array['updated_at']);
                unset($params_array['user']);

           
    		$car = Car::where('id', $id)->update($params_array);

    		$data = array(
    			'car' => $params,
    			'status' => 'success',
    			'code' => 200,
    		);

    	}else{
    		//devolver error
    		$data = array(
    			'message' => 'login incorrecto',
    			'status' => 'error',
    			'code' => 300,
    		);
    	}
    	return response()->json($data, 200);
    }

    public function destroy($id, Request $request){
    	$hash = $request->header('Authorization', null);
    	$JwtAuth = new JwtAuth();
    	$checktoken = $JwtAuth->checkToken($hash);

    	if($checktoken){
    		//comprobar que exista
    		$car = Car::find($id);

    		//borrarlo
    		$car->delete();

    		//devolverlo
      		$data = array(
    			'car' => $car,
    			'status' => 'success',
    			'code' => 200,
    		);

    	}else{
    	//devolver error
    		$data = array(
    			'message' => 'login incorrecto',
    			'status' => 'error',
    			'code' => 300,
    		);
    	}
    	return response()->json($data, 200);
    }
}
