<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MohonRequest;

class AdminMohonRequestController extends Controller
{

    public function index(Request $request)
    {
        \Log::info($request);
        $paginate = MohonRequest::query(); // Intiate Paginate
        $mohons = $paginate->orderBy('id','DESC')
                    //->with(['mohonApproval'])
                    ->with(['user.userProfile.userDepartment','mohonApproval'])

                    // only list where step = 3
                    ->whereHas('mohonApproval', function ($query) use ($request) {
                        $query->where('status', $request->query('status'))->where('step', 3);
                    })

                    //->withCount(['mohonItems']) // to calculate how many items
                    ->withCount([
                        'mohonItems', // Mohon hasMany MohonItems
                        'mohonDistributionItems' // Mohon hasMany MohonDistributionItems
                        
                        ]) // to calculate how many items
                    
                    ->paginate(10) // 10 items per page
                    ->withQueryString(); // with GET Query String


        // Calculate the starting number based on the current page
        $startNumber = ($mohons->currentPage() - 1) * $mohons->perPage() + 1;

        // Add the numbering field to each item
        $mohons->getCollection()->transform(function ($item, $index) use ($startNumber) {
            $item->numbering = $startNumber + $index;
            return $item;
        });  
                               
    
        return response()->json([
            'mohons' => $mohons
        ]);
    }
}