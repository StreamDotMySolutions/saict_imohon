<?php

namespace App\Http\Requests\MohonApproval;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'acknowledge' => 'required',
            'status' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'acknowledge.required' => 'Sila sahkan tindakan anda',
        ];
    }
}
