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
            'message' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'acknowledge.required' => 'Sila sahkan data',
            'message.required' => 'Sila lengkapkan butiran tambahan.',
        ];
    }
}
