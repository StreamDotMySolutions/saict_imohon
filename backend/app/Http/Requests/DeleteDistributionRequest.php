<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeleteDistributionRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'acknowledge' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'acknowledge.required' => 'Sila sahkan tindakan anda',
        ];
    }
}
