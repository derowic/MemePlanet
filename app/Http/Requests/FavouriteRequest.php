<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FavouriteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->user()->hasRole('user') || auth()->user()->hasRole('admin') || auth()->user()->hasRole('moderator');
    }

    public function rules(): array
    {
        return [
            'post_id' => 'required|numeric|exists:posts,id|min:1',
        ];
    }
}
