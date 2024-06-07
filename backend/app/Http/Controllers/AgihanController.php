<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MohonRequest;

class AgihanController extends Controller
{
    public function mohon()
    {

        $paginate = MohonRequest::query(); // Intiate Paginate
        $items = $paginate->orderBy('id','DESC')
                    //->with(['mohonApproval'])

                    ->with(['user.userProfile.userDepartment','mohonApproval'])

                    // step=1 is where user requesting approval
                    // step=2 is where manager approved
                    ->whereHas('mohonApproval', function ($query) {
                        $query->where('status', 'approved')->where('step', 2);
                    })

                    ->withCount(['mohonItems']) // to calculate how many items
                    
                    ->paginate(10) // 10 items per page
                    ->withQueryString(); // with GET Query String

        return response()->json(['items' => $items]);
        
    }
}
