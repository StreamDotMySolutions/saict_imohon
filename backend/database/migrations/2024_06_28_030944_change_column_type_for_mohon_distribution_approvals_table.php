<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class ChangeColumnTypeForMohonDistributionApprovalTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('mohon_distribution_approvals', function (Blueprint $table) {
            // Make the column nullable temporarily
            $table->text('message')->nullable()->change();
        });

        // If needed, you can update data here to ensure it fits the new column type

        Schema::table('mohon_distribution_approvals', function (Blueprint $table) {
            // Convert the column type
            $table->text('message')->change();

            // Optionally make the column not null again
            $table->text('message')->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('mohon_distribution_approvals', function (Blueprint $table) {
            // Revert the column type
            $table->string('message', 255)->change();
        });
    }
}
