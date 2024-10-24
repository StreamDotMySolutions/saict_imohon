<?php
namespace App\Http\Requests\MohonApproval;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    public function rules(): array
    {
        // Log the request data
        //\Log::info('Request Data:', $this->all());
        return [
            'acknowledge' => 'required',
            //'message' => 'required',
            'manager_id' => 'required|integer'
        ];
    }

    public function messages()
    {
        return [
            //'message.required' => 'Sila nyatakan justifikasi',
            'manager_id.required' => 'Sila pilih pelulus',
            'manager_id.integer' => 'Sila pilih pelulus',
            'acknowledge.required' => 'Sila sahkan tindakan anda',
        ];
    }
}
