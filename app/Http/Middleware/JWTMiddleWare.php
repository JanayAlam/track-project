<?php

namespace App\Http\Middleware;

use Tymon\JWTAuth\Facades\JWTAuth;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

// https://dev.to/roxie/jwt-auth-exception-handling-in-laravel-8-45gd
class JWTMiddleWare {
    /**
     * Handle an incoming request.
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response {
        $_ = JWTAuth::parseToken()->authenticate();
        return $next($request);
    }
}
