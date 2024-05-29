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
        Schema::table('mohon_approvals', function (Blueprint $table) {
            $table->integer('manager_id')->nullable(); // manager_id pelulus 1
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mohon_approvals', function (Blueprint $table) {
            $table->dropColumn('manager_id'); // manager_id pelulus 1
        });
    }
};
