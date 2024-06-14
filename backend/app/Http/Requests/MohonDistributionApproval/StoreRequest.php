<?php

namespace App\Http\Requests\MohonDistributionApproval;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'boss_id' => 'required',
            'acknowledge' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'boss_id.required' => 'Sila pilih pelulus 2',
            'acknowledge.required' => 'Sila sahkan tindakan anda',
        ];
    }
}