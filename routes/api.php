<?php

use \App\Http\Controllers\Api\V1\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\AdminController;
use App\Http\Controllers\Api\V1\ProfileController;
use App\Http\Controllers\Api\V1\ProjectController;
use App\Http\Controllers\Api\V1\IssueController;

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

Route::group(['middleware' => 'api', 'prefix' => 'v1/users', 'namespace' => 'App\Http\Controllers\Api\V1'], function () {
    Route::get('/', [UserController::class, 'index']);
    Route::get('/{id}', [UserController::class, 'show']);
    Route::patch('/change-password', [UserController::class, 'changePassword']);
    Route::patch('/change-username', [UserController::class, 'changeUsername']);
    Route::patch('/change-email', [UserController::class, 'changeEmail']);
});

Route::group(['middleware' => 'api', 'prefix' => 'v1/admins', 'namespace' => 'App\Http\Controllers\Api\V1'], function () {
   Route::post('/', [AdminController::class, 'create']) ;
});

Route::group(['middleware' => 'api', 'prefix' => 'v1/profiles', 'namespace' => 'App\Http\Controllers\Api\V1'], function () {
    Route::post('/', [ProfileController::class, 'store']);
});

Route::group(['middleware' => 'api', 'prefix' => 'v1/projects', 'namespace' => 'App\Http\Controllers\Api\V1'], function () {
    Route::post('/', [ProjectController::class, 'store']);
    Route::get('/', [ProjectController::class, 'getAll']);
    Route::get('/{id}', [ProjectController::class, 'get']);
    Route::patch('/finish-project/{id}', [ProjectController::class, 'finishProject']);
});

Route::group(['middleware' => 'api', 'prefix' => 'v1/issues', 'namespace' => 'App\Http\Controllers\Api\V1'], function () {
    Route::post('/', [IssueController::class, 'store']);
    Route::get('/p/{id}', [IssueController::class, 'getIssuesByProjectId']);
    Route::patch('/i/status/{id}', [IssueController::class, 'changeStatus']);
});
