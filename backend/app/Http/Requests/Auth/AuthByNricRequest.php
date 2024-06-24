<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;


class AuthByNricRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules()
    {
        return [
            'nric' => [
                'required',
                //'integer',
                //'regex:/^[0-9]{6}-[0-9]{2}-[0-9]{4}$/'
                //'regex:/^[0-9]{12}$/' // 12 digits
                'numeric',
                'digits:12',
            ],
            'password' => ['required', 'string'],
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */

     public function authenticate()
     {
 
         if (! Auth::attempt($this->only('nric', 'password'))) {
 
             throw ValidationException::withMessages([
                 'nric' => __('auth.failed'),
             ]);

         }
 
     }

     public function messages()
     {
         return [
             'nric.regex' => 'Format kad pengenalan anda salah, sila guna format xxxxxxxxxxxx',
         ];
     }
}
