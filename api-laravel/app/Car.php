<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $table = 'cars'; //laravel reconoce si la clase es Car, la tabla sera cars.

    public function user(){
    	return $this->belongsTo('App\User', 'user_id');
    }
}
