<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\MalaysianNRIC;


class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
          
            'role' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',

            'name' => 'required',
            'occupation' => 'required',
            'nric' => [
                'required',
                'string',
                //'regex:/^\d{6}-(?:[LMTSCJH]{1}|[0-9]{2})-\d{3}(?:[A-Z]{2}|[0-9]{2})$/',
                'regex:/^[0-9]{6}-[0-9]{2}-[0-9]{4}$/'
            ],
            'phone' => 'required',
            'address' => 'required',

            'user_department_id' => 'required',
           
        ];
    }
}
