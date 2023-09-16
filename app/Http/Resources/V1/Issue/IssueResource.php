<?php

namespace App\Http\Resources\V1\Issue;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Date;

class IssueResource extends JsonResource {
    /**
     * Transform the resource into an array.
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'details' => $this->details,
            'branch_name' => $this->branch_name,
            'label' => $this->label,
            'is_closed' => (bool) $this->is_closed,
            'status' => $this->status,
            'deadline' => $this->deadline ?? null,
            'project_id' => $this->project_id,
            'updated_at' => $this->updated_at->format('m-d-Y H:i:s'),
            'created_at' => $this->created_at->format('m-d-Y H:i:s'),
        ];
    }
}
