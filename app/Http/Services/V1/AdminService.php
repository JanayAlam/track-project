<?php

namespace App\Http\Services\V1;

use Exception;
use App\Http\Resources\V1\User\UserResource;
use App\Http\Services\Service;
use App\Models\Admin;

class AdminService extends Service {
    /**
     * Create a new admin.
     * @param array $data
     * @return UserResource|null
     * @throws Exception
     */
    public static function create(array $data) {
        try {
            $admin = Admin::create($data);
        } catch (Exception $e) {
            throw new Exception('Could not create admin');
        }
        return $admin ? new UserResource($admin) : null;
    }
}
