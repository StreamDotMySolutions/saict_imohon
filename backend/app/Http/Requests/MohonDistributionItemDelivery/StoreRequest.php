<?php

namespace App\Http\Requests\MohonDistributionItemDelivery;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRequest extends FormRequest
{
    public function rules()
    {
        return [
                'acknowledge' => 'required',
                'pic_phone' => 'required',
                'pic_name' => 'required',
                'date_start' => 'required|date',
                'date_end' => 'required|date|after:date_start',
        ];
    }

    public function messages()
    {
        return [
            'acknowledge.required' => 'Sila sahkan data',
            'pic_name.required' => 'Sila masukkan nama vendor peralatan',
            'pic_phone.required' => 'Sila pilih peralatan',
            'date_start.required' => 'Sila pilih tarikh mula kontrak',
            'date_end.after' => 'Tarikh tamat kontrak mesti selepas tarikh mula',
            'date_end.required' => 'Sila pilih tarikh tamat kontrak',
        ];
    }
}
