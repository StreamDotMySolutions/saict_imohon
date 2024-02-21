<?php

namespace App\Http\Requests\MohonDistributionRequest;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'acknowledge' => 'required|sometimes',
            'message' => 'required|sometimes',
        ];
    }

    public function messages()
    {
        return [
            'acknowledge.required' => 'Sila sahkan permohonan',
            'message.required' => 'Nyatakan tujuan permohonan',
        ];
    }
}
