<?php

namespace App\Http\Requests\MohonDistributionRequest;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'acknowledge' => 'required',
            //'message' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'acknowledge.required' => 'Sila sahkan permohonan',
            //'message.required' => 'Nyatakan tujuan permohonan',
        ];
    }
}
