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
            'name' => 'required',
            'occupation' => 'required',
            'department' => 'required',
            'section' => 'required',
            'unit' => 'required',
            'mobile' => 'required',
            'location' => 'required',
            //'description' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'category_id.required' => 'Sila pilih item',
            'type.required' => 'Sila pilih jenis permohonan',
            //'description.required' => 'Sila nyatakan tujuan permohonan',
            'name.required' => 'Nama diperlukan',
            'occupation.required' => 'Sila nyatakan pekerjaan',
            'department.required' => 'Sila nyatakan Jabatan / Bahagian',
            'section.required' => 'Sila nyatakan seksyen',
            'unit.required' => 'Sila nyatakan unit',
            'mobile.required' => 'Sila nyatakan no telefon ( peribadi )',
            'location.required' => 'Sila nyatakan lokasi peralatan',
        ];
    }
}
