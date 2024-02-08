<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class StoreMohonRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            //'acknowledge' => 'required',
            'title' => 'required',
            'description' => 'required',
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
