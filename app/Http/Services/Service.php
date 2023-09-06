<?php

namespace App\Http\Services;

class Service {
    /**
     * Create a record in the database.
     * @param array $data
     * @return null
     */
    public static function create(array $data) {
        return null;
    }

    public static function get(array $queryItems=null, array $queries=[]) {
        return [];
    }

    public static function getById(int $id) {
        return null;
    }

    public static function updateById(int $id, array $data) {
        return null;
    }

    public static function destroyById(int $id) : bool {
        return false;
    }
}
