<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\V1\Auth\LoginRequest;
use App\Http\Requests\V1\Auth\RegisterRequest;
use Exception;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\User\UserResource;
use App\Http\Services\V1\UserService;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller {
    /**
     * Create a new AuthController instance.
     * @return void
     */
    public function __construct() {
        $this->middleware('auth.jwt', ['except' => ['login', 'register']]);
    }

    /**
     * Get the authenticated User.
     * @return JsonResponse
     */
    public function authUser(): JsonResponse {
        return response()->json([
            'data' => new UserResource(auth()->user()),
        ]);
    }

    /**
     * Get the token array structure.
     * @param string $token
     * @return JsonResponse
     */
    protected function createNewToken(string $token): JsonResponse {
        return response()->json([
            'data' => [
                'accessToken' => $token,
                'tokenType' => 'bearer',
                'expiresIn' => auth()->factory()->getTTL() * 60 * 24,
                'user' => new UserResource(auth()->user()),
            ],
        ]);
    }

    /**
     * Get a JWT via given credentials.
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse {
        try {
            if (!$token = auth()->attempt($request->all())) {
                return response()->json([
                    'message' => 'Invalid credentials',
                    'errors' => [
                        'email' => ['Invalid credentials'],
                        'password' => ['Invalid credentials'],
                    ]
                ], 401);
            }
        } catch (Exception $e) {
            return response()->json([
                'errors' => [$e->getMessage()] || ['Could not create token'],
            ], 500);
        }
        return $this->createNewToken($token);
    }

    /**
     * Register a User.
     * @param RegisterRequest $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse {
        try {
            $user = UserService::create($request->all());
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'errors' => [
                    'username' => [$e->getMessage()],
                    'email' => [$e->getMessage()],
                ],
            ], 400);
        }

        if (!$user) {
            return response()->json([
                'message' => 'User could not be created',
                'errors' => [
                    'username' => ['User could not be created'],
                    'email' => ['User could not be created'],
                ],
            ], 417);
        }

        return response()->json([
            'message' => 'User successfully registered',
            'data' => new UserResource($user),
        ], 201);
    }

    /**
     * Log the user out (Invalidate the token).
     * @return JsonResponse
     */
    public function logout(): JsonResponse {
        auth()->logout();
        return response()->json([
            'message' => 'User successfully signed out'
        ]);
    }

    /**
     * Refresh a token.
     * @return JsonResponse
     */
    public function refresh(): JsonResponse {
        return $this->createNewToken(auth()->refresh());
    }
}
