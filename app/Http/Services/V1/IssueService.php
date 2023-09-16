<?php

namespace App\Http\Services\V1;

use App\Http\Resources\V1\Issue\IssueCollection;
use App\Http\Resources\V1\Issue\IssueResource;
use Exception;
use TypeError;
use App\Models\Issue;

class IssueService {
    /**
     * Get an issue from database.
     * @param int $id
     * @return mixed
     * @throws Exception
     */
    private static function getIssue(int $id): mixed {
        try {
            $issue = Issue::find($id);
        } catch (TypeError $e) {
            throw new Exception('Invalid id provided');
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        return $issue;
    }

    /**
     * Create a new issue.
     * @param array $data
     * @return IssueResource|null
     * @throws Exception
     */
    public static function create(array $data): ?IssueResource {
        try {
            $project = ProjectService::getProject($data['project_id']);
            if (!$project) return null;
            $issue = Issue::create($data);
            return $issue ? new IssueResource($issue) : null;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    public static function getAll(int $project_id) {
        try {
            $project = ProjectService::getProject($project_id);
            if (!$project) return null;
            $issues = $project->issues;
            return new IssueCollection($issues);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
}
