<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class PasswordUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        if(auth()->user()->lang == "pl")
        {
            return [
                'current_password.required' => 'Pole "Aktualne hasło" jest wymagane.',
                'current_password.current_password' => 'Aktualne hasło jest nieprawidłowe.',
                'password.required' => 'Pole "Nowe hasło" jest wymagane.',
                'password.confirmed' => 'Potwierdzenie nowego hasła nie pasuje.',
            ];
        }
        else
        {
            return [
                'current_password.required' => 'The current password field is required.',
                'current_password.current_password' => 'The current password is incorrect.',
                'password.required' => 'The new password field is required.',
                'password.confirmed' => 'The new password confirmation does not match.',
            ];
        }
    }
}
