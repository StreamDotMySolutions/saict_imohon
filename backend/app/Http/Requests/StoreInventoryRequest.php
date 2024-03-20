<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreInventoryRequest extends FormRequest
{
    public function rules()
    {
        return [
                'acknowledge' => 'required',
                'vendor' => 'required',
                'email' => 'required|email',
                'phone' => 'required',
                'model' => 'required',
                'category_id' => 'required|integer',

                // 'item' => [
                //     'required',
                //     Rule::in(['pc', 'nb', 'pbwn', 'pcn' , 'projektor', 'webcam']),
                // ],

                'total' => 'required|integer',

                'date_start' => 'required|date',
                'date_end' => 'required|date|after:date_start',
                //'received_on' => 'required|date|after_or_equal:date_start|before_or_equal:date_end',
                'received_on' => 'required|date|before:date_start|before_or_equal:date_end',

    
        ];
    }

    public function messages()
    {
        return [
            'total.required' => 'Sila masukkan jumlah peralatan',
            'acknowledge.required' => 'Sila sahkan data',
            'vendor.required' => 'Sila masukkan nama vendor peralatan',
            'category_id.integer' => 'Sila pilih peralatan',
            'item.required' => 'Sila pilih peralatan',
            'item.in' => 'Peralatan yang anda pilih tidak sah',
            'date_start.required' => 'Sila pilih tarikh mula kontrak',
            'date_end.after' => 'Tarikh tamat kontrak mesti selepas tarikh mula',
            'date_end.required' => 'Sila pilih tarikh tamat kontrak',
            'date_end.required' => 'Sila pilih tarikh tamat kontrak',
            'received_on.required' => 'Sila pilih tarikh terima peralatan',
            'received_on.after_or_equal' => 'Tarikh penerimaan peralatan mesti di antara tarikh mula dan tarikh tamat kontrak',
            'received_on.before_or_equal' => 'Tarikh penerimaan peralatan mesti di antara tarikh mula dan tarikh tamat kontrak',
            'total.required' => 'Sila nyatakan jumlah dalam integer',
            'total.integer' => 'Sila nyatakan jumlah dalam integer',
        ];
    }
}
