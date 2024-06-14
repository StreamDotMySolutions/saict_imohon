<?php
namespace App\Services\Administrations;

use App\Models\MohonRequest;
use App\Models\MohonApproval;
use Illuminate\Http\Request;

class MohonDistributionService
{

   

    public static function delete($id)
    {
        // Find the MohonRequest instance by its ID
        $mohonRequest = MohonRequest::findOrFail($id);

        // Delete MohonItems
        $mohonRequest->mohonItems()->delete();

        // Delete MohonApproval
        $mohonRequest->mohonApproval()->delete();

        // Delete MohonDistributionRequest
        $mohonRequest->mohonDistributionRequests()->each(function ($distributionRequest) {

            // delete mohon distribution items

            // Delete related mohonDistributionItemAcceptance if it exists
            // Iterate through and delete each mohonDistributionItem and its related mohonDistributionItemAcceptance records
            $distributionRequest->mohonDistributionItems()->each(function ($distributionItem) {
                try {
                    \Log::info('Processing Distribution Item ID: ' . $distributionItem->id);

                    // Delete related mohonDistributionItemAcceptance if it exists
                    $acceptance = $distributionItem->mohonDistributionItemAcceptance;
                    if ($acceptance) {
                        $acceptance->delete();
                    }

                    // Delete related mohonDistributionItemDelivery if it exists
                    $delivery = $distributionItem->mohonDistributionItemDelivery;
                    if ($delivery) {
                        $delivery->delete();
                    }

                    // Delete the distributionItem itself
                    $distributionItem->delete();
                } catch (\Exception $e) {
                    \Log::error('Error deleting Distribution Item or its related records: ' . $e->getMessage());
                }
            });
            //$distributionRequest->mohonDistributionItems()->delete();
            

       
            // delete agihan request
            $distributionRequest->mohonDistributionApprovals()->delete();
        });

        // delete the mohon distribution requests
        $mohonRequest->mohonDistributionRequests()->delete();

        // now delete Mohon Request
        return $mohonRequest->delete();
    }
}