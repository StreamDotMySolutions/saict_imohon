<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Models\MohonRequest;
use App\Services\MohonService;
use App\Http\Requests\Mohon\StoreMohonRequest;
use App\Http\Requests\Mohon\UpdateMohonRequest;
use App\Http\Requests\Mohon\TicketMohonRequest;
use App\Http\Controllers\Controller;
use App\Models\MohonDistributionRequest;

class MohonRequestController extends Controller
{

    public function index(Request $request)
    {

        //\Log::info($request);
        //$status = 'pending';
        //\Log::info($request->input('status'));
        $mohons = MohonService::index($request->input('status'), $request->input('tab'));

        return response()->json([
            'mohons' => $mohons
        ]);
    }

    public function store(StoreMohonRequest $request)
    {

        $mohon = MohonService::store($request);

        return response()->json([
            'message' => 'Permohonan disimpan',
            'id' => $mohon->id
        ]);
    }

    public function show($mohonRequestid)
    {
        $mohon = MohonService::show($mohonRequestid);
        return response()->json([
            'mohon' => $mohon
        ]);
    }

    public function update(UpdateMohonRequest $request, $id)
    {
        // \Log::info($id);
        // \Log::info($request);

        $updated = MohonService::update($request,$id);

        if($updated){
            return response()->json([
                'message' => 'Permohonan berjaya dikemaskini',
                'id' => $id
            ]);
        } else {
            return response()->json([
                'message' => 'Permohonan gagal dikemaskini',
            ],422);
        }
    }

    public function delete($mohonRequestid)
    {
        $deleted = MohonService::delete($mohonRequestid);

        if($deleted){
            return response()->json([
                'message' => 'Permohonan berjaya dipadam',
                'id' => $mohonRequestid
            ]);
        } else {
            return response()->json([
                'message' => 'Permohonan gagal dipadam',
            ],422);
        }
    }

    public function agihan()
    {
        $user = auth('sanctum')->user();

        $agihan = MohonDistributionRequest::query()
            ->whereHas('mohonRequest', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })
            ->whereHas('mohonDistributionApproval', function ($q) {
                $q->where('status', 'approved');
            })
            ->with([
                'mohonRequest',
                'mohonDistributionApproval',
                'mohonDistributionItems.category',
                'mohonDistributionItems.inventory',
                'mohonDistributionItems.mohonItem',
                'mohonDistributionItems.mohonDistributionItemDelivery',
                'mohonDistributionItems.mohonDistributionItemAcceptance',
            ])
            ->orderBy('id', 'DESC')
            ->paginate(10)
            ->withQueryString();

        return response()->json(['agihan' => $agihan]);
    }

    public function ticketStore(TicketMohonRequest $request, MohonRequest $mohonRequest){

        //\Log::info($request);
        $mohonRequest->ticket_status = $request->input('ticket_status');
        $mohonRequest->ticket_close_date = $request->input('ticket_status') === 'close' ? now() : null;
        $mohonRequest->save();
    
        return response()->json([
            'message' => 'Ticket status updated successfully',
            'ticket_status' => $request->input('ticket_status'),
            'ticket_close_date' => $mohonRequest->ticket_close_date,
        ]);
    }

    public function ticketStatus(MohonRequest $mohonRequest){
        return response()->json([
            'mohon' => $mohonRequest
        ]);
    }

    public function openTicket($id)
    {
        return response()->json([
            'message' => 'Tiket permohonan dibuka',
            'id' => $id
        ]);
    }

    public function closeTicket($id)
    {
        return response()->json([
            'message' => 'Tiket permohonan ditutup',
            'id' => $id
        ]);
    }

}
