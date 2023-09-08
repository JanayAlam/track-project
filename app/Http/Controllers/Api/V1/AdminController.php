<?php

namespace App\Http\Controllers\Api\V1;

use Exception;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Admin\AdminStoreRequest;
use App\Http\Services\V1\AdminService;
use \Illuminate\Http\JsonResponse;

class AdminController extends Controller {
    /**
     * Create a new AdminController instance.
     * @return void
     */
    public function __construct() {
        $this->middleware('auth.jwt');
        $this->middleware('admin.check');
    }

    public static function create(AdminStoreRequest $request): JsonResponse {
        try {
            $admin = AdminService::create(['user_id' => $request->get('user_id')]);
            if (!$admin) throw new Exception('This user is already an admin');
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Could not upgrade the user to an admin',
                'error' => $e->getMessage(),
            ]);
        }
        return response()->json([
            'message' => 'A new admin has been created',
            'data' => $admin
        ]);
    }
}
