<?php

namespace App\Http\Requests\MohonDistributionItemAcceptance;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'acknowledge' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'acknowledge.required' => 'Sila sahkan data',
        ];
    }
}
