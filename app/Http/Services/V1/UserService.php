<?php

namespace App\Http\Services\V1;

use Exception;
use Illuminate\Support\Facades\Hash;
use TypeError;
use App\Http\Resources\V1\User\UserCollection;
use App\Http\Resources\V1\User\UserResource;
use App\Http\Services\Service;
use App\Models\User;
use Illuminate\Database\UniqueConstraintViolationException;

class UserService extends Service {
    /**
     * Get a user from database.
     * @param int $id
     * @return mixed
     * @throws Exception
     */
    private static function getUser(int $id): mixed {
        try {
            $user = User::find($id);
        } catch (TypeError $e) {
            throw new Exception('Invalid id provided');
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        return $user;
    }

    /**
     * Create a new user.
     * @param array $data
     * @return UserResource|null
     * @throws Exception
     */
    public static function create(array $data): ?UserResource {
        try {
            $data['password'] = bcrypt($data['password']);
            $user = User::create($data);
        } catch (UniqueConstraintViolationException $e) {
            throw new Exception('Username or email has been already taken');
        }
        return $user ? new UserResource($user) : null;
    }

    /**
     * Get all users from database.
     * @param array|null $queryItems
     * @param array $queries
     * @return UserCollection
     */
    public static function get(array $queryItems=null, array $queries=[]): UserCollection {
        return new UserCollection(User::where($queryItems)->paginate()->appends($queries));
    }

    /**
     * Get a single user by their id.
     * @param int $id
     * @return UserResource|null
     * @throws Exception
     */
    public static function getById(int $id): ?UserResource {
        $user = UserService::getUser($id);
        return !$user ? null : new UserResource($user);
    }

    /**
     * Update a user by their id.
     * @param int $id
     * @param array $data
     * @return bool
     * @throws Exception
     */
    public static function updateById(int $id, array $data): bool {
        $user = self::getById($id);
        if (!$user) return false;
        $user->update($data);
        return true;
    }

    /**
     * Update a user's password by their id.
     * @param int $id
     * @param string $currentPassword
     * @param string $newPassword
     * @return bool
     * @throws Exception
     */
    public static function updatePasswordById(int $id, string $currentPassword, string $newPassword) : bool {
        $user = self::getById($id);
        if (!Hash::check($currentPassword, $user->password)) {
            return false;
        }
        $user->update(['password' => bcrypt($newPassword)]);
        return true;
    }

    public static function destroyById(int $id) : bool {
        return User::destroy($id);
    }
}
