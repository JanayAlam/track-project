<?php

namespace App\Http\Controllers\Api\V1;

use Exception;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Profile\StoreProfileRequest;
use App\Http\Requests\V1\Profile\UpdateProfileRequest;
use App\Http\Services\V1\ProfileService;
use App\Models\Profile;

class ProfileController extends Controller {
    /**
     * Create a new ProfileController instance.
     * @return void
     */
    public function __construct() {
        $this->middleware('auth.jwt');
    }

    /**
     * Display a listing of the resource.
     */
    public function index() {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProfileRequest $request) {
        $data = [
            'first_name' => $request->json()->all()['first_name'],
            'last_name' => $request->json()->all()['last_name'],
            'gender' => strtoupper($request->json()->all()['gender']),
            'bio' => $request->json()->all()['bio'],
            'user_id' => auth()->user()->getAuthIdentifier(),
        ];
        try {
            $profile = ProfileService::create($data);
            if (!$profile) {
                throw new Exception('Could not create a profile');
            }
            return response()->json([
                'message' => 'Successfully created a new profile',
                'data' => $profile,
            ], 201);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Profile $profile) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Profile $profile) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProfileRequest $request, Profile $profile) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Profile $profile) {
        //
    }
}
