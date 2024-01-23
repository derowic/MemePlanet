<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        app()->setLocale(auth()->user()->lang);

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

    public function messages(): array
    {
        $category = $this->route('category');
        if(auth()->user()->lang == "pl")
        {
            return [
                'name' => [
                    'required' => 'Pole nazwy jest wymagane.',
                    'string' => 'Wartość musi być ciągiem znaków.',
                    'min:1' => 'Minimalna długość to jeden znak.',
                    'unique' => 'Podana nazwa jest już zajęta.',
                ],
            ];
        }
        else
        {
            return [
                'name' => [
                    'required' => 'The name field is required.',
                    'string' => 'The value must be a string.',
                    'min:1' => 'The minimum length is one character.',
                    'unique' => 'The name has already been taken.',
                ],
            ];
        }
    }
}
