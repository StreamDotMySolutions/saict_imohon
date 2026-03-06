<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\ItemRequest\StoreItemRequest;
use App\Services\ItemRequestService;

class ItemRequestController extends Controller
{
    public function store(StoreItemRequest $request)
    {
        $mohonRequest = ItemRequestService::store($request);

        return response()->json([
            'message' => 'Permohonan berjaya dihantar',
            'id' => $mohonRequest->id,
        ]);
    }
}
