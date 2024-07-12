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
        Schema::table('mohon_distribution_item_acceptances', function (Blueprint $table) {
            $table->string('serial_number')->nullable()->after('mohon_distribution_item_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('serial_number', function (Blueprint $table) {
            $table->dropColumn('serial_number');
        });
    }
};
