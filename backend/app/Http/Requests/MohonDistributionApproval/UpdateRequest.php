<?php

namespace App\Http\Requests\MohonDistributionApproval;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'acknowledge' => 'required',
            // 'title' => 'sometimes|required',
            // 'description' => 'sometimes|required',
        ];
    }

    public function messages()
    {
        return [
            'acknowledge.required' => 'Sila sahkan tindakan anda',
            //'description.required' => 'Sila nyatakan tujuan permohonan',
        ];
    }
}
