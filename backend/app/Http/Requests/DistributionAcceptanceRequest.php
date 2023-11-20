<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DistributionAcceptanceRequest extends FormRequest
{

    public function rules(){
        return [
            'acknowledge' => 'required',
            'status' => [
                'required',
                Rule::in(['received']),
            ]
        ];
    }

    public function messages()
    {
        return [
            'acknowledge.required' => 'Sila sahkan data',
        ];
    }

}
