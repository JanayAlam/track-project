<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminCheck {
    /**
     * Handle an incoming request.
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response|JsonResponse {
        if (!!auth()->user()->admin) return $next($request);
        return response()->json([
            'message' => 'You need to be an admin to perform this operation',
            'error' => 'Don\'t have the permission to access this resource'
        ], 403);
    }
}
