<?php

namespace App\Http\Requests\Inventory;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRequest extends FormRequest
{
    public function rules()
    {
        return [
                'acknowledge' => 'required|boolean',
                'category_id' => 'required|integer',
                'acknowledge' => 'required',
                'vendor' => 'required',
                'email' => 'required|email',
                'phone' => 'required',
                'model' => 'required',
                
                'contract_name' => 'required',
                'contract_number' => 'required',
                'contract_pic' => 'required',
                'contract_owner' => 'required',

                'total' => 'required|integer',

                'date_start' => 'required|date',
                'date_end' => 'required|date|after:date_start',
                'received_on' => 'required|date|before_or_equal:date_start',

    
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
            'received_on.before_or_equal' => 'Tarikh penerimaan peralatan sebelum tarikh mula',
            'total.required' => 'Sila nyatakan jumlah dalam integer',
            'total.integer' => 'Sila nyatakan jumlah dalam integer',

            'contract_name.required' => 'Sila nyatakan nama kontrak' ,
            'contract_number.required' => 'Sila nyatakan nombor kontrak' ,
            'contract_pic.required' => 'Sila nyatakan nama ( Person In Charge )' ,
            'contract_owner.required' => 'Sila nyatakan nama pemilik kontrak' ,
            'email.required' => 'Alamat email diperlukan' ,
            'phone.required' => 'No telefon diperlukan' ,
            'model.required' => 'Model peralatan diperlukan' ,
            'category_id.required' => 'Pilih peralatan' ,
            
        ];
    }
}
