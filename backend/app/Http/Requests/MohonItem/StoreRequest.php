<?php

namespace App\Http\Requests\MohonItem;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            //'acknowledge' => 'required',
            'category_id' => 'required',
            'type' => 'required',
            'description' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'category_id.required' => 'Sila pilih item',
            'type.required' => 'Sila pilih jenis permohonan',
            'description.required' => 'Sila nyatakan tujuan permohonan',
        ];
    }
}
