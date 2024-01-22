<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    public function authorize(): bool
    {
        app()->setLocale("pl");

        return auth()->user()->hasRole('user') || auth()->user()->hasRole('admin') || auth()->user()->hasRole('moderator');
    }

    public function rules(): array
    {
        return [
            'image' => 'required|file|mimes:jpeg,png,jpg,gif',
            'title' => 'required|string|min:1',
            'text' => 'required|string|min:1',
            'category' => 'required|numeric|min:1',
            'tags' => 'sometimes|nullable|exists:tags,id',
            'customTag' => 'sometimes|nullable|string|min:1',
        ];
    }

    public function messages(): array
    {
        if(auth()->user()->lang == "pl")
        {
            return [
                'image.required' => 'Pole obrazka jest wymagane.',
                'image.file' => 'Wartość pola musi być plikiem graficznym.',
                'image.mimes' => 'Plik musi mieć jedno z rozszerzeń: jpeg, png, jpg, gif.',

                'title.required' => 'Pole tytułu jest wymagane.',
                'title.string' => 'Wartość pola musi być ciągiem znaków.',
                'title.min' => 'Minimalna długość pola to jeden znak.',

                'text.required' => 'Pole tekstu jest wymagane.',
                'text.string' => 'Wartość pola musi być ciągiem znaków.',
                'text.min' => 'Minimalna długość pola to jeden znak.',

                'category.required' => 'Pole kategorii jest wymagane.',
                'category.numeric' => 'Pole kategorii jest wymagane.',
                'category.min' => 'Pole kategorii jest wymagane.',

                'tags.exists' => 'Wartość pola musi istnieć w bazie danych.',

                'customTag.string' => 'Wartość pola musi być ciągiem znaków.',
                'customTag.min' => 'Minimalna długość pola to jeden znak.',
            ];
        }
        else
        {
            return [
                'image.required' => 'The image field is required.',
                'image.file' => 'The value of the field must be a file.',
                'image.mimes' => 'The file must have one of the following extensions: jpeg, png, jpg, gif.',

                'title.required' => 'The title field is required.',
                'title.string' => 'The value of the field must be a string.',
                'title.min' => 'The minimum length of the field is one character.',

                'text.required' => 'The text field is required.',
                'text.string' => 'The value of the field must be a string.',
                'text.min' => 'The minimum length of the field is one character.',

                'category.required' => 'The category field is required.',
                'category.numeric' => 'The category field is required.',
                'category.min' => 'The category field is required.',

                'tags.exists' => 'The value of the field must exist in the database.',

                'customTag.string' => 'The value of the field must be a string.',
                'customTag.min' => 'The minimum length of the field is one character.',
            ];
        }
    }
}
