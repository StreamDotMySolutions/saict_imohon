<?php

namespace App\Http\Controllers\Administrations;

use App\Models\MohonDistributionRequest;

use App\Services\Administrations\MohonDistributionService;

// use App\Http\Requests\DeleteMohonRequest;

class AdministrationMohonDistributionController extends Controller
{

    public function index(){
        $paginate = MohonDistributionRequest::query(); // Intiate Paginate
        $items = $paginate->orderBy('id','DESC')
                    ->with(['user.userProfile','mohonDistributionApproval'])
                    ->withCount(['mohonDistributionItems']) // to calculate how many items
                    ->paginate(10) // 10 items per page
                    ->withQueryString(); // with GET Query String
                               
  
        return response()->json([
            'message' => 'Senarai agihan',
            'items' => $items
        ]);
    }

   

    public function delete($id)
    {
        $deleted = MohonDistributionService::delete($id);

        if($deleted){
            return response()->json([
                'message' => 'Permohonan berjaya dipadam',
                'id' => $id
            ]);
        } else {
            return response()->json([
                'message' => 'Permohonan gagal dipadam',
            ],422);
        }
    }

}
