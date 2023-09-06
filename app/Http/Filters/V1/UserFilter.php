<?php

namespace App\Http\Filters\V1;

use App\Http\Filters\ApiFilter;

class UserFilter extends ApiFilter {
    protected array $safeParams = [
        'joinedAt' => ['gt', 'eq', 'lt', 'ne'],
    ];

    protected array $columnMap = [
        'joinedAt' => 'created_at',
    ];

    protected array $operatorMap = [
        'lt' => '<',
        'eq' => '=',
        'ne' => '!=',
        'gt' => '>',
    ];
}
