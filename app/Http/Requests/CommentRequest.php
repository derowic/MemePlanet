<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->user()->hasRole('user') || auth()->user()->hasRole('admin') || auth()->user()->hasRole('moderator');
    }

    public function rules(): array
    {
        return [
            'post_id' => 'required|numeric|exists:posts,id|min:1',
            'comment_id' => 'nullable|
                numeric|
                exists:comments,id|
                min:1',
            'text' => 'required|string|min:1',
        ];
    }
}
