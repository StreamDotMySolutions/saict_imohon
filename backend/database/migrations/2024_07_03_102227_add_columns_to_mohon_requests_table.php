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
        Schema::table('mohon_requests', function (Blueprint $table) {
            $table->boolean('ticket_status')->default(false)->after('step');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mohon_requests', function (Blueprint $table) {
            $table->dropColumn('ticket_status');
        });
    }
};
