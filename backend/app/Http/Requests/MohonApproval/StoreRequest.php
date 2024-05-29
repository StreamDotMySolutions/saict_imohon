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
            'manager_id' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'manager_id.required' => 'Sila pilih pelulus',
            'acknowledge.required' => 'Sila sahkan tindakan anda',
        ];
    }
}
