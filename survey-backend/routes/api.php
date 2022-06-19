<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AnswerController;


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

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::post('check', 'check');

});


Route::controller(SurveyController::class)->group(function(){
    Route::get('survey', 'getAll')->name('survey.getAll');
    Route::get('survey/{id}', 'get')->name('survey.getAll');
});

Route::controller(AnswerController::class)->group(function(){
    Route::post('answer', 'add')->name('answers.add');
   
});

Route::middleware('role.admin')->group(function(){
    Route::controller(SurveyController::class)->group(function(){
        Route::post('survey', 'add')->name('survey.add');
        Route::post('survey/close', 'close')->name('survey.close');
    });
    Route::controller(UserController::class)->group(function(){
        Route::get('user/surveys', 'get')->name('user.surveys');
    });
});
