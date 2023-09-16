<?php

namespace App\Http\Services\V1;

use App\Models\Issue;
use Exception;
use TypeError;
use App\Http\Resources\V1\Project\ProjectCollection;
use App\Http\Resources\V1\Project\ProjectResource;
use App\Models\Project;

class ProjectService {
    /**
     * Get a project from database.
     * @param int $id
     * @return mixed
     * @throws Exception
     */
    public static function getProject(int $id): mixed {
        try {
            $project = Project::find($id);
        } catch (TypeError $e) {
            throw new Exception('Invalid id provided');
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        return $project;
    }

    /**
     * Create a new profile.
     * @param array $data
     * @return ProjectResource|null
     * @throws Exception
     */
    public static function create(array $data): ?ProjectResource {
        try {
            $project = Project::create($data);
            return $project ? new ProjectResource($project) : null;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    public static function getByProfileId(int $profile_id): ProjectCollection {
        return new ProjectCollection(ProfileService::findById($profile_id)->projects);
    }

    /**
     * Update a project.
     * @param int $project_id
     * @param array $data
     * @return bool
     * @throws Exception
     */
    public static function updateById(int $project_id, array $data): bool {
        $project = self::getProject($project_id);
        if (!$project) return false;
        if ($project->profile_id != auth()->user()->profile->id) return false;
        $project->update($data);
        return true;
    }
}
