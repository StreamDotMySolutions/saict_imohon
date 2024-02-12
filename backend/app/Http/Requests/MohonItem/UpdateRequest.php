<?php

namespace App\Http\Requests\MohonItem;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            //'acknowledge' => 'required',
            'category_id' => 'sometimes|required',
            'type' => 'sometimes|required',
            'description' => 'sometimes|required',
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
