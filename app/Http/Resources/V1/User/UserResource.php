<?php

namespace App\Http\Resources\V1\User;

use App\Http\Resources\V1\Profile\ProfileResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource {
    /**
     * Transform the resource into an array.
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'email' => $this->email,
            'joinedAt' => $this->created_at->format('m-d-Y H:i:s'),
            'isAdmin' => (bool) $this->admin,
            'profile' => $this->profile ? new ProfileResource($this->profile) : null,
        ];
    }
}
