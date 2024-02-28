<?php
namespace App\Http\Requests\Mohon;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'acknowledge' => 'required',
   
        ];
    }

    public function messages()
    {
        return [
            'acknowledge.required' => 'Sila sahkan tindakan anda',
        ];
    }
}
