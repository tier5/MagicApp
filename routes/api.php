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
//route for creating the zap
Route::post('create-user-zap','UserController@createUserZap');
//route for get the list of user zaps
Route::post('user-zap-list','UserController@userZapList');
//route for getting the pariculler zap data for Edit
Route::post('get-zap-data','UserController@getZapData');
//route for update the user zap
Route::post('update-user-zap','UserController@updateUserZap');
//route for delete the user zap
Route::post('delete-user-zap','UserController@deleteUserZap');
//route for validate and send the user zaps to zapier trigger
Route::any('send-user-zap/{api_key?}','ZapierController@getZapDataList');
//route for sending the zap data to zapier trigger
Route::any('send-zap-data/{zapId?}','ZapierController@sentZapData');
//route to save data from the script
Route::post('script-data','ZapierController@saveScriptData');







