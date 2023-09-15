<?php

namespace App\Http\Resources\V1\Project;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource {
    /**
     * Transform the resource into an array.
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'summary' => $this->summary,
            'repo_url' => $this->repo_url,
            'is_running' => (bool) $this->is_running,
            'profile_id' => $this->profile_id,
            'updated_at' => $this->updated_at->format('m-d-Y H:i:s'),
            'created_at' => $this->created_at->format('m-d-Y H:i:s'),
        ];
    }
}
