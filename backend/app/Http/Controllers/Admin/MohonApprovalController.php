<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\MohonApprovalService;
use App\Http\Requests\MohonApproval\UpdateRequest;

class MohonApprovalController extends Controller
{

     // Admin process MohonRequest step = 3 to step = 4
     public function update(UpdateRequest $request, $mohonRequestId)
     {
         //\Log::info($request);
         $mohonApprovalService = MohonApprovalService::storeByAdmin($request, $mohonRequestId);
 
         if($mohonApprovalService)
         {
             return response()->json([
                 'message' => 'Permohonan berjaya diproses',
             ]);
         } else {
             return response()->json([
                 'message' => 'Permohonan gagal diproses',
             ],422);
         }
     }
}