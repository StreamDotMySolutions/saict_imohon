<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDistributionRequest extends FormRequest
{

    public function rules(){
        return [
            'application_id' => 'sometimes|exists:applications,id',
            'acknowledge' => 'required',
            'item' => [
                'sometimes',
                Rule::in(['pc', 'nb', 'pbwn', 'pcn' , 'projektor', 'webcam']),
            ],
            'total' => 'sometimes|integer',
            'description' => 'sometimes|min:6'
    
        ];
    }

    public function messages()
    {
        return [
            'application_id.required' => 'No rujukan permohonan diperlukan',
            'application_id.exists' => 'No rujukan permohonan tidak sah',
            'acknowledge.required' => 'Sila sahkan data',
            'item.required' => 'Sila pilih peralatan',
            'item.in' => 'Peralatan yang anda pilih tidak sah',
            'total.required' => 'Sila nyatakan jumlah peralatan',
            'total.integer' => 'Sila nyatakan jumlah dalam integer',
            'description.min' => 'Sila isi mesej',
        ];
    }

}
