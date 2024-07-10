<?php

namespace App\Http\Requests\MohonDistributionItemAcceptance;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRequest extends FormRequest
{
    public function rules()
    {

        //\Log::info($this->all());
        return [
            'acknowledge' => 'required',
            'pic_name' => 'required',
            'pic_phone' => 'required',
            'installation_date' => 'required|date',
            'message' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'acknowledge.required' => 'Sila sahkan data',
            'pic_name.required' => 'Nama Resident Engineer diperlukan',
            'pic_phone.required' => 'No telefon Resident Engineer diperlukan',
            'installation_date.required' => 'Tarikh pemasangan diperlukan',
            'message.required' => 'Sila lengkapkan butiran tambahan.',
        ];
    }
}
