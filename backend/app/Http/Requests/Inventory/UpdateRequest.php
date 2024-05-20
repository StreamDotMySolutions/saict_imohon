<?php

namespace App\Http\Requests\Inventory;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRequest extends FormRequest
{

    public function rules()
    {

        //\Log::info(\Request::all());

        return [
                'acknowledge' => 'required',
                'category_id' => 'sometimes|integer',
                'vendor' => 'sometimes',
                'email' => 'sometimes|email',
                'phone' => 'sometimes',
                'model' => 'sometimes',
                
                'contract_name' => 'sometimes',
                'contract_number' => 'sometimes',
                'contract_pic' => 'sometimes',
                'contract_owner' => 'sometimes',

                'total' => 'sometimes|integer',

                'date_start' => 'sometimes|date',
                'date_end' => 'sometimes|date|after:date_start',
                'received_on' => 'sometimes|date|before:date_start|before_or_equal:date_end',
        ];
    }

    public function messages()
    {
        return [
            'total.required' => 'Sila masukkan jumlah peralatan',
            'acknowledge.required' => 'Sila sahkan data',
            'vendor.required' => 'Sila masukkan nama vendor peralatan',
            'item.required' => 'Sila pilih peralatan',
            'item.in' => 'Peralatan yang anda pilih tidak sah',
            'date_start.required' => 'Sila pilih tarikh mula kontrak',
            'date_end.after' => 'Tarikh tamat kontrak mesti selepas tarikh mula',
            'date_end.required' => 'Sila pilih tarikh tamat kontrak',
            'date_end.required' => 'Sila pilih tarikh tamat kontrak',
            'received_on.required' => 'Sila pilih tarikh terima peralatan',
            'received_on.after_or_equal' => 'Tarikh penerimaan peralatan mesti di antara tarikh mula dan tarikh tamat kontrak',
            'received_on.before_or_equal' => 'Tarikh penerimaan peralatan mesti di antara tarikh mula dan tarikh tamat kontrak'
        ];
    }
}
