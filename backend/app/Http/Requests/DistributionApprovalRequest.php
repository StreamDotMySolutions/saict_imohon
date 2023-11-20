<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DistributionApprovalRequest extends FormRequest
{

    public function rules(){
        return [
            'acknowledge' => 'required',
            'status' => [
                'required',
                Rule::in(['rejected', 'approved']),
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
