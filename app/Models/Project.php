<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model {
    use HasFactory;

    protected $fillable = ['title', 'summary', 'repo_url', 'is_running', 'profile_id'];

    public function profile(): BelongsTo {
        return $this->belongsTo(Profile::class);
    }

    public function issues(): HasMany {
        return $this->hasMany(Issue::class);
    }
}
