<?php

use Illuminate\Http\Request;
use \App\Http\Controllers\Api\V1\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['middleware' => 'api', 'prefix' => 'v1/auth', 'namespace' => 'App\Http\Controllers\Api\V1'], function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user', [AuthController::class, 'authUser']);
});

Route::group(['prefix' => 'v1/users', 'namespace' => 'App\Http\Controllers\Api\V1'], function () {
    Route::get('/', [UserController::class, 'index']);
    Route::get('/{id}', [UserController::class, 'show']);
    Route::patch('/change-password', [UserController::class, 'changePassword']);
    Route::patch('/change-username', [UserController::class, 'changeUsername']);
    Route::patch('/change-email', [UserController::class, 'changeEmail']);
});
