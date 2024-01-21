<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['string', 'max:5'],
            'email' => ['email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
        ];
    }

    public function messages(): array
    {
        if(auth()->user()->lang == "pl")
        {
            return [
                'name.string' => 'Pole "Imię" musi być ciągiem znaków.',
                'name.max' => 'Pole "Imię" nie może przekraczać :max znaków.',

                'email.email' => 'Pole "E-mail" musi być poprawnym adresem e-mail.',
                'email.max' => 'Pole "E-mail" nie może przekraczać :max znaków.',
                'email.unique' => 'Podany adres e-mail już istnieje. Wybierz inny.',
            ];
        }
        else
        {
            return [
                'name.string' => 'The "Name" field must be a string.',
                'name.max' => 'The "Name" field cannot exceed :max characters.',

                'email.email' => 'The "Email" field must be a valid email address.',
                'email.max' => 'The "Email" field cannot exceed :max characters.',
                'email.unique' => 'The provided email address already exists. Please choose a different one.',
            ];
        }
    }
}
