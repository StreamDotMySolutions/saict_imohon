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
        \Log::info(\Request::all());
        $request = $this->request;
        return [
            'acknowledge' => 'required',
            'description' => 'required',

            'pc' => 'sometimes|integer',
            'pc_description' =>[
                Rule::requiredIf( function () {
                    return !empty($this->input('pc'));
                }),
                'filled'

            ],
            'pc_type' => [
                            Rule::requiredIf( function () {
                                return !empty($this->input('pc'));
                            }),
                            Rule::in(['new','replace'])
                        ],

            'nb' => 'sometimes|integer',
            'nb_description' =>[
                Rule::requiredIf( function () {
                    return !empty($this->input('nb'));
                }),
                'filled'

            ],
            'nb_type' => [
                            Rule::requiredIf( function () {
                                return !empty($this->input('nb'));
                            }),
                            Rule::in(['new','replace'])
                        ],


            'pbwn' => 'sometimes|integer',
            'pbwn_description' =>[
                Rule::requiredIf( function () {
                    return !empty($this->input('pbwn'));
                }),
                'filled'

            ],
            'pbwn_type' => [
                            Rule::requiredIf( function () {
                                return !empty($this->input('pbwn'));
                            }),
                            Rule::in(['new','replace'])
                        ],

            'pcn' => 'sometimes|integer',
            'pcn_description' =>[
                Rule::requiredIf( function () {
                    return !empty($this->input('pcn'));
                }),
                'filled'

            ],
            'pcn_type' => [
                            Rule::requiredIf( function () {
                                return !empty($this->input('pcn'));
                            }),
                            Rule::in(['new','replace'])
                        ],
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
