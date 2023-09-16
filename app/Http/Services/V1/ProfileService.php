<?php

namespace App\Http\Services\V1;

use App\Http\Resources\V1\Profile\ProfileResource;
use App\Models\Profile;
use Mockery\Exception;

class ProfileService {
    public static function findProfileByUserId(int $id) {
        return Profile::where('user_id', $id)->first();
    }

    public static function findById(int $id) {
        return Profile::find($id);
    }

    /**
     * Create a new profile.
     * @param array $data
     * @return ProfileResource|null
     * @throws Exception
     */
    public static function create(array $data): ?ProfileResource {
        try {
            if (self::findProfileByUserId($data['user_id'])) {
                throw new Exception('Already a profile exist');
            }
            $profile = Profile::create($data);
            return $profile ? new ProfileResource($profile) : null;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
}
