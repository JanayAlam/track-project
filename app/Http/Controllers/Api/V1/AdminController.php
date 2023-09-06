<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAdminRequest;
use App\Http\Requests\UpdateAdminRequest;
use App\Models\Admin;

class AdminController extends Controller {
    /**
     * Create a new AdminController instance.
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api');
    }
}
