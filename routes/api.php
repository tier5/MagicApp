<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
////Application User Routes
/// route for user login
Route::post('userlogin','UserController@userLogin');
// route for user suginup/registration
Route::post('signup','UserController@userSignUp');
//route for creating the zapier token
Route::post('create-zapier-token','UserController@createZapierToken');


