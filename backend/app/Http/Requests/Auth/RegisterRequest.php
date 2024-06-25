<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
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
          
            //'role' => 'required',
            //'email' => 'required|email|unique:users,email',
            'email' => ['required','email', Rule::unique('users')],
            'password' => 'required|min:6|confirmed',
            //'password' => 'required|min:6',
            //'password' => 'required_if:password_present,true|min:6',

            'name' => 'required',
            'occupation' => 'required',
            'nric' => [
                'required',
                'numeric',
                'digits:12',
                // 'integer',
                // 'regex:/^[0-9]{12}$/',
                //'regex:/^[0-9]{6}-[0-9]{2}-[0-9]{4}$/',
                //'unique:user_profiles,nric'
                Rule::unique('users')
            ],
            //'phone' => 'required',
            'phone' => [
                'sometimes',
                'required',
                'numeric',
                'digits_between:1,11',
            ],

            'address' => 'required',

            'user_department_id' => 'required',
           
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Sila berikan alamat email',
            'email.email' => 'Sila berikan alamat email yang sah',

            'password.required' => 'Sila lengkapkan katalaluan',
            'password.min' => 'Sekurang-kurangnya 6 aksara',
            'password.confirmed' => 'Pengesahan katalaluan tidak sama',

            'name.required' => 'Sila lengkapkan nama anda',
            'nric.required' => 'Sila lengkapkan nombor kad pengenalan (baharu)',

            'occupation.required' => 'Sila lengkapkan jawatan anda',

            'phone.required' => 'Sila lengkapkan no telefon (pejabat)',
            'address.required' => 'Sila lengkapkan alamat (pejabat)',

            'user_department_id.required' => 'Sila lengkapkan jabatan',

        ];
    }
}

