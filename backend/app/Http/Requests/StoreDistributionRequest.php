<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDistributionRequest extends FormRequest
{

    public function rules(){
        return [
            'acknowledge' => 'required',
            'item' => [
                'required',
                Rule::in(['pc', 'nb', 'pbwn', 'pcn' , 'projektor', 'webcam']),
            ],
            'total' => 'required',
            'description' => 'required'
    
        ];
    }

    public function messages()
    {
        return [
            'acknowledge.required' => 'Sila sahkan data',
            'item.required' => 'Sila pilih peralatan',
            'item.in' => 'Peralatan yang anda pilih tidak sah',
            'total.required' => 'Sila nyatakan jumlah peralatan',
            'description.required' => 'Sila isi mesej',
        ];
    }

}
