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
     
        //\Log::info($this->all());
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
                Rule::unique('users')
            ],

            'phone' => [
      
                'required',
                'numeric',
                'digits_between:10,11',
            ],

            'level' => [
                'required',
                'max:255'
            ],

            'building' => [
                'required',
                'max:255'
            ],

            'address' => 'required',
            'user_department_id' => 'required',
           
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Sila berikan alamat email',
            'email.unique' => 'Alamat email telah digunakan',
            'email.email' => 'Sila berikan alamat email yang sah',

            'nric.required' => 'Sila lengkapkan nombor kad pengenalan tanpa ( - )',
            'nric.numeric' => 'Nombor kad pengenalan tanpa ( - ).',
            'nric.digits' => ' Hanya nombor digit sahaja dibenarkan.',

            'password.required' => 'Sila lengkapkan katalaluan',
            'password.min' => 'Sekurang-kurangnya 6 aksara',
            'password.confirmed' => 'Pengesahan katalaluan tidak sama',

            'name.required' => 'Sila lengkapkan nama anda',
            'occupation.required' => 'Sila lengkapkan jawatan anda',

            'phone.required' => 'Sila lengkapkan no telefon ( peribadi )',
            'phone.numeric' => 'Hanya nombor sahaja dibenarkan. ',
            'phone.digits_between' => 'Nombor telefon antara 10 atau 11 aksara.',

            'level.required' => 'Sila lengkapkan aras tingkat',
            'building.required' => 'Sila lengkapkan nama bangunan',
            'address.required' => 'Sila lengkapkan alamat (pejabat)',
            'user_department_id.required' => 'Sila lengkapkan jabatan',

        ];
    }
}


