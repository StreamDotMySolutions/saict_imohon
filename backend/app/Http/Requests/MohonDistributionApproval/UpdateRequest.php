<?php

namespace App\Http\Requests\MohonDistributionApproval;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'message' => 'required',
            'acknowledge' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'message.required' => 'Sila lengkapkan justifikasi',
            'acknowledge.required' => 'Sila sahkan tindakan anda',
        ];
    }
}
