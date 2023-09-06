<?php

namespace App\Http\Requests\V1\User;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class PasswordUpdateRequest extends FormRequest {
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
            'current_password' => ['required', 'min:6'],
            'new_password' => ['required', 'confirmed', 'min:6'],
        ];
    }

    protected function prepareForValidation (): void {}
}
