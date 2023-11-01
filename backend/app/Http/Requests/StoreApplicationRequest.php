<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        \Log::info(\Request::input('pc_items'));
        $request = $this->request;
        return [
            'acknowledge' => 'required',
            'description' => 'required',

            'pc_total' => 'sometimes|integer',
            'pc_description' =>[
                Rule::requiredIf( function () {
                    return !empty($this->input('pc'));
                }),
                'filled'

            ],
            // 'pc_type' => [
            //                 Rule::requiredIf( function () {
            //                     return !empty($this->input('pc'));
            //                 }),
            //                 Rule::in(['new','replace'])
            //             ],

            'nb_total' => 'sometimes|integer',
            'nb_description' =>[
                Rule::requiredIf( function () {
                    return !empty($this->input('nb'));
                }),
                'filled'

            ],
            // 'nb_type' => [
            //                 Rule::requiredIf( function () {
            //                     return !empty($this->input('nb'));
            //                 }),
            //                 Rule::in(['new','replace'])
            //             ],


            'pbwn_total' => 'sometimes|integer',
            'pbwn_description' =>[
                Rule::requiredIf( function () {
                    return !empty($this->input('pbwn'));
                }),
                'filled'

            ],
            // 'pbwn_type' => [
            //                 Rule::requiredIf( function () {
            //                     return !empty($this->input('pbwn'));
            //                 }),
            //                 Rule::in(['new','replace'])
            //             ],

            'pcn_total' => 'sometimes|integer',
            'pcn_description' =>[
                Rule::requiredIf( function () {
                    return !empty($this->input('pcn'));
                }),
                'filled'

            ],
            // 'pcn_type' => [
            //                 Rule::requiredIf( function () {
            //                     return !empty($this->input('pcn'));
            //                 }),
            //                 Rule::in(['new','replace'])
            //             ],
        ];
    }

    
    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'type.required' => 'Sila pilih jenis permohonan',
            'description.required' => 'Sila nyatakan tujuan permohonan',

            'pc.integer' => 'Sila nyatakan jumlah dalam bentuk integer',
            'pc_description.min' => 'Sila nyatakan tujuan permohonan',
            'pc_type.in' => 'Sila pilih jenis permohonan',
        ];
    }
}
