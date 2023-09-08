<?php

namespace App\Http\Services\V1;

use Exception;
use App\Http\Resources\V1\Admin\AdminResource;
use App\Http\Services\Service;
use App\Models\Admin;

class AdminService extends Service {
    public static function findAdminByUserId(int $id) {
        return Admin::where('user_id', $id)->first();
    }

    /**
     * Create a new admin.
     * @param array $data
     * @return AdminResource|null
     * @throws Exception
     */
    public static function create(array $data): ?AdminResource {
        $pastRecord = self::findAdminByUserId($data['user_id']);
        if (!!$pastRecord) return null;
        $admin = Admin::create($data);
        return $admin ? new AdminResource($admin) : null;
    }
}
