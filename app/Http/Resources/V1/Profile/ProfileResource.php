<?php

namespace App\Http\Resources\V1\Profile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource {
    /**
     * Transform the resource into an array.
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'gender' => $this->gender,
            'bio' => $this->bio,
            'user_id' => $this->user_id,
            'created_at' => $this->created_at->format('m-d-Y H:i:s'),
            'updated_at' => $this->updated_at->format('m-d-Y H:i:s'),
        ];
    }
}
