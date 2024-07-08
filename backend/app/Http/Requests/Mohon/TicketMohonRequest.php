<?php
namespace App\Http\Requests\Mohon;
use Illuminate\Foundation\Http\FormRequest;

class TicketMohonRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'acknowledge' => 'required',
            'ticket_status' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'acknowledge.required' => 'Sila sahkan tindakan',
            'ticket_status.required' => 'Sila pilih status tiket',
        ];
    }
}
