<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Services\V1\ProjectService;
use Exception;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Project\StoreProjectRequest;

class ProjectController extends Controller {
    public function __constructor(): void {
        $this->middleware('auth.jwt');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request) {
        $body = $request->json()->all();
        try {
            $data = [
                'title' => $body['title'],
                'summary' => $body['summary'],
                'repo_url' => $body['repo_url'] ?? null,
                'is_running' => 1,
                'profile_id' => auth()->user()->profile->id,
            ];
            $project = ProjectService::create($data);
            if (!$project) throw new Exception('Could not create a project');
            return response()->json([
                'message' => 'Successfully created a new project',
                'data' => $project,
            ], 201);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getAll() {
        try {
            $projects = ProjectService::getByProfileId(auth()->user()->profile->id);
            return response()->json([
                'data' => $projects,
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function finishProject(int $id) {
        try {
            if (!ProjectService::updateById($id, [
                'is_running' => false,
            ])) {
                throw new Exception('Could not update the project');
            }
            return response()->json([
                'message' => 'The project is marked as finished',
            ], 203);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
