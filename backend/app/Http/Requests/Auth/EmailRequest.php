<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class EmailRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }


    public function rules()
    {
        return [
            'email' => 'required|string|email|exists:users,email'
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'email.required' => 'Sila isi alamat emel anda',
            'email.string' => 'Sila betulkan alamat emel anda',
            'email.email' => 'Sila betulkan alamat emel anda',
            'email.exists' => 'Alamat email tidak wujud',
        ];
    }

}
