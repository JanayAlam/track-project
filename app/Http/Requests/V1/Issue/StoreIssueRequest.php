<?php

namespace App\Http\Requests\V1\Issue;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreIssueRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array {
        return [
            'title' => ['required', 'max:150'],
            'label' => ['required', Rule::in(['feature', 'bug', 'documentation', 'refactor', 'test'])],
            'project_id' => ['required', 'integer'],
        ];
    }
}
