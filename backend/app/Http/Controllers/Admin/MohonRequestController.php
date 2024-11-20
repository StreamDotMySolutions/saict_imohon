<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MohonRequest;
use App\Services\Administrations\MohonService;

class MohonRequestController extends Controller
{

    public function index(Request $request)
    {
        
       // $mohons = [];

        switch($request->query('status')){
            case 'pending': $mohons = $this->pending(); break;
            case 'approved': $mohons = $this->approved(); break;
            case 'rejected': $mohons = $this->rejected(); break;
            default: $mohons = $this->default(); break;
        }
                               
    
        return response()->json([
            'mohons' => $mohons
        ]);
    }

    public function default()
    {
        $paginate = MohonRequest::query(); // Intiate Paginate
        $mohons = $paginate->orderBy('id','DESC')
                    //->with(['mohonApproval'])
                    ->with(['user.userProfile.userDepartment','mohonApproval'])

                    ->withCount(['mohonItems']) // to calculate how many items
                    
                    ->paginate(10) // 10 items per page
                    ->withQueryString(); // with GET Query String

        return $mohons;
    }

    public function pending()
    {
        $paginate = MohonRequest::query(); // Intiate Paginate
        $mohons = $paginate->orderBy('id','DESC')
                    //->with(['mohonApproval'])
                    ->with(['user.userProfile.userDepartment','mohonApproval'])

                    // only list where step = 3
                    ->whereHas('mohonApproval', function ($query)  {
                        $query->where('status', 'pending' )
                              ->where('step', 3);
                    })

                    ->whereDoesntHave('mohonApproval', function ($query) {
                        $query->where('step', 4);
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
                               
        return $mohons;

    }

    public function approved()
    {
        $paginate = MohonRequest::query(); // Intiate Paginate
        $mohons = $paginate->orderBy('id','DESC')
                    //->with(['mohonApproval'])
                    ->with(['user.userProfile.userDepartment','mohonApproval'])

                    // only list where step = 3
                    ->whereHas('mohonApproval', function ($query)  {
                        $query->where('status', 'approved' )
                              ->where('step', 4);
                    })

                    // ->whereDoesntHave('mohonApproval', function ($query) {
                    //     $query->where('step', 4);
                    // })

                    
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
                               
        return $mohons;
    }

    public function rejected()
    {
        $paginate = MohonRequest::query(); // Intiate Paginate
        $mohons = $paginate->orderBy('id','DESC')
                    //->with(['mohonApproval'])
                    ->with(['user.userProfile.userDepartment','mohonApproval'])

                    // only list where step = 3
                    ->whereHas('mohonApproval', function ($query)  {
                        $query->where('status', 'rejected' )
                              ->where('step', 4);
                    })

                    // ->whereDoesntHave('mohonApproval', function ($query) {
                    //     $query->where('step', 4);
                    // })

                    
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
                               
        return $mohons;
    }

    public function delete($id)
    {
        $deleted = MohonService::delete($id);

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