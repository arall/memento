<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'AngularController@serveApp');


Route::group(['prefix' => 'api/v1/'], function () {

    // Sample
    Route::post('test/sample', 'WelcomeController@sample');

    // Auth
    Route::post('authenticate', 'AuthenticateController@authenticate');

    // Memories
    Route::resource('memory', 'MemoryController', ['except' => ['create', 'edit']]);

});
