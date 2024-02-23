<?php

namespace App\Http\Requests\MohonDistributionRequest;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            //'acknowledge' => 'required',
            'title' => 'sometimes|required',
            'description' => 'sometimes|required',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Sila tulis tajuk permohonan',
            'description.required' => 'Sila nyatakan tujuan permohonan',
        ];
    }
}
