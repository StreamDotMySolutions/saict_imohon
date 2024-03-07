<?php

namespace App\Http\Requests\MohonDistributionItem;

use Illuminate\Foundation\Http\FormRequest;

class ReceivedRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'acknowledge' => 'required',
            'received_text' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'acknowledge.required' => 'Sila sahkan tindakan anda',
            'received_text.required' => 'Sila lengkapkan mesej penerimaan peralatan',
        ];
    }
}
