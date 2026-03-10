<?php

namespace App\Http\Requests\ItemRequest;

use Illuminate\Foundation\Http\FormRequest;

class StoreItemRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'items'                  => 'required|array|min:1',
            'items.*.category_id'    => 'required|exists:categories,id',
            'items.*.type'           => 'required|in:new,replacement',
            'items.*.name'           => 'required|string',
            'items.*.occupation'     => 'required|string',
            'items.*.mobile'         => 'required|string',
            'items.*.building_name'  => 'required|string',
            'items.*.building_level' => 'required|string',
            'items.*.location'       => 'required|string',
            'items.*.description'    => 'required|string',
            'manager_id'             => 'required|integer|exists:users,id',
            'acknowledge'            => 'required|accepted',
        ];
    }

    public function messages()
    {
        return [
            'items.required'                    => 'Sila tambah sekurang-kurangnya satu peralatan',
            'items.min'                         => 'Sila tambah sekurang-kurangnya satu peralatan',
            'items.*.category_id.required'      => 'Sila pilih item',
            'items.*.type.required'             => 'Sila pilih jenis permohonan',
            'items.*.name.required'             => 'Nama diperlukan',
            'items.*.occupation.required'       => 'Sila nyatakan pekerjaan',
            'items.*.mobile.required'           => 'Sila nyatakan no telefon ( peribadi )',
            'items.*.building_name.required'    => 'Sila nyatakan nama bangunan',
            'items.*.building_level.required'   => 'Sila nyatakan tingkat bangunan',
            'items.*.location.required'         => 'Sila nyatakan lokasi peralatan',
            'items.*.description.required'      => 'Sila lengkapkan justifikasi permohonan',
            'manager_id.required'               => 'Sila pilih pelulus',
            'acknowledge.required'              => 'Sila tandakan pengesahan',
            'acknowledge.accepted'              => 'Sila tandakan pengesahan',
        ];
    }
}
