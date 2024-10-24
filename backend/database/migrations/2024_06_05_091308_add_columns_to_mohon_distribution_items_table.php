<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('mohon_distribution_items', function (Blueprint $table) {
            $table->integer('mohon_item_id')->nullable()->after('id');
            $table->string('inventory_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mohon_distribution_items', function (Blueprint $table) {
            $table->dropColumn('mohon_item_id');
            $table->dropColumn('inventory_id');
        });
    }
};
