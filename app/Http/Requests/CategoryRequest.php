<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->user()->hasRole('user') || auth()->user()->hasRole('admin') || auth()->user()->hasRole('moderator');
    }

    public function rules(): array
    {
        $category = $this->route('category');

        return [
            'name' => [
                'required',
                'string',
                'min:1',
                Rule::unique('categories', 'name')->ignore($category),
            ],
        ];
    }
}
