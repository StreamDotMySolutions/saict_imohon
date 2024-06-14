<?php

namespace App\Http\Requests\MohonDistributionApproval;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{

    public function rules(): array
    {

        \Log::info($this->all());
        return [
            'boss_id' => 'required|integer',
            'acknowledge' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'boss_id.integer' => 'Sila pilih pelulus 2',
            'boss_id.required' => 'Sila pilih pelulus 2',
            'acknowledge.required' => 'Sila sahkan tindakan anda',
        ];
    }
}