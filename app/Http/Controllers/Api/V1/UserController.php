<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Filters\V1\UserFilter;
use App\Http\Requests\V1\User\EmailUpdateRequest;
use App\Http\Requests\V1\User\PasswordUpdateRequest;
use App\Http\Requests\V1\User\UsernameUpdateRequest;
use App\Http\Resources\V1\User\UserCollection;
use App\Http\Resources\V1\User\UserResource;
use App\Http\Services\V1\UserService;
use Exception;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller {
    /**
     * Create a new UserController instance.
     * @return void
     */
    public function __construct() {
        $this->middleware('auth.jwt');
    }

    /**
     * Display a listing of the resource.
     * @param Request $request
     * @return UserCollection
     */
    public function index(Request $request): UserCollection {
        $filter = new UserFilter();
        $queryItems = $filter->transform($request);
        return UserService::get($queryItems, $request->query());
    }

    /**
     * Display the specified resource.
     * @param int $id
     * @return JsonResponse|UserResource
     */
    public function show(int $id): JsonResponse|UserResource {
        $statusCode = 400;
        try {
            $user = UserService::getById($id);
            if (!$user) {
                $statusCode = 404;
                throw new Exception('User not found with the provided id');
            }
            return $user;
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], $statusCode);
        }
    }

    /**
     * Change password in storage.
     */
    public function changePassword(PasswordUpdateRequest $request): JsonResponse {
        $requestBody = $request->json()->all();
        $currentPassword = $requestBody['current_password'];
        $newPassword = $requestBody['new_password'];
        $authUser = auth()->user();
        $statusCode = 500;
        try {
            if (!UserService::updatePasswordById($authUser->id, $currentPassword, $newPassword)) {
                $statusCode = 401;
                throw new Exception('Current password does not match');
            }
            return response()->json(['message' => 'Password updated']);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'errors' => [
                    'current_password' => $e->getMessage(),
                ],
            ], $statusCode);
        }
    }

    /**
     * Change email in storage.
     */
    public function changeUsername(UsernameUpdateRequest $request): JsonResponse {
        $username = $request->json()->get('username');
        $statusCode = 500;
        try {
            if (!UserService::updateById(auth()->user()->id, ['username' => $username])) {
                $statusCode = 404;
                throw new Exception('User not found with the provided id');
            }
            return response()->json(['message' => 'Username updated']);
        } catch (UniqueConstraintViolationException $e) {
            $msg = 'Username has been already taken';
            return response()->json([
                'message' => $msg,
                'errors' => [
                    'username' => $msg,
                ],
            ], $statusCode);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'errors' => [
                    'username' => $e->getMessage(),
                ],
            ], $statusCode);
        }
    }

    /**
     * Change email in storage.
     */
    public function changeEmail(EmailUpdateRequest $request): JsonResponse {
        $email = $request->json()->get('email');
        $statusCode = 500;
        try {
            if (!UserService::updateById(auth()->user()->id, ['email' => $email])) {
                $statusCode = 404;
                throw new Exception('User not found with the provided id');
            }
            return response()->json(['message' => 'Email updated']);
        } catch (UniqueConstraintViolationException $e) {
            $msg = 'Email already in use';
            return response()->json([
                'message' => $msg,
                'errors' => [
                    'email' => $msg,
                ],
            ], $statusCode);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'errors' => [
                    'email' => $e->getMessage(),
                ],
            ], $statusCode);
        }
    }
}
