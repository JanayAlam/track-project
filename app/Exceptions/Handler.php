<?php

namespace App\Exceptions;

use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler {
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void {
        $this->renderable(function(TokenInvalidException $_e){
            return response()->json([
                'message' => 'Invalid token',
                'error' => 'Unauthenticated',
            ],401);
        });

        $this->renderable(function (TokenExpiredException $_e) {
            return response()->json([
                'message' => 'Token has expired',
                'error' => 'Unauthenticated',
            ],401);
        });

        $this->renderable(function (JWTException $_e) {
            return response()->json([
                'message' => 'Token has not provided',
                'error' => 'Unauthenticated',
            ], 401);
        });
    }
}
