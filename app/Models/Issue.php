<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Issue extends Model {
    use HasFactory;

    protected $fillable = ['title', 'details', 'branch_name', 'label', 'status', 'is_closed', 'deadline', 'project_id'];

    public function project (): BelongsTo {
        return $this->belongsTo(Project::class);
    }
}
