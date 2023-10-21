<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAccountRequest extends FormRequest
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

        $user =  auth('sanctum')->user();

        return [

            'name' => [
                'sometimes',
                'string',
                //'required_if:is_name_required,true',
            ],

            'email' => [
                'sometimes',
                'email',
                // assuming id is pk
                Rule::unique('users', 'email')->ignore($user->id)->whereNull('deleted_at'),
            ],
        ];
    }
}
