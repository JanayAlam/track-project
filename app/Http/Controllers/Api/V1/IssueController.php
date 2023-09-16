<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\V1\Issue\IssueResource;
use App\Http\Services\V1\IssueService;
use App\Models\Issue;
use Exception;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Issue\StoreIssueRequest;

class IssueController extends Controller {
    public function __constructor(): void {
        $this->middleware('auth.jwt');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreIssueRequest $request) {
        $body = $request->json()->all();
        try {
            $branch_name = isset($body['branch_name']) ?
                $body['label'] . '/' . $body['branch_name']
                : $body['label'] . '/' . random_int(1, 100);
            $data = [
                'title' => $body['title'],
                'details' => $body['details'] ?? null,
                'label' => $body['label'],
                'status' => 'todo',
                'branch_name' => $branch_name,
                'deadline' => $body['deadline'] ?? null,
                'project_id' => $body['project_id'],
            ];
            $issue = IssueService::create($data);
            if (!$issue) throw new Exception('Could not create an issue');
            return response()->json([
                'message' => 'Successfully created an issue',
                'data' => $issue,
            ], 201);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public static function getIssuesByProjectId(int $id) {
        try {
            $issues = IssueService::getAll($id);
            if (!$issues) throw new Exception('Project not found');
            return response()->json([
                'data' => $issues,
            ], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public static function changeStatus(int $id) {
        // TODO
        try {
            $status = request()->json()->get('status');
            if (!$status) throw new Exception('Bad request');
            $issue = Issue::find($id);
            if ($status == 'done') {
                $issue->update([
                    'is_closed' => true,
                    'status' => $status,
                ]);
            } else {
                $issue->update(['status' => $status]);
            }
            return response()->json([
                'message' => 'Successfully changed the status',
                'data' => new IssueResource($issue),
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
