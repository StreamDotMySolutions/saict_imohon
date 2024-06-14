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
            $table->integer('admin_id')->nullable()->after('user_id'); // admin who approve the request
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mohon_approvals', function (Blueprint $table) {
            $table->dropColumn('admin_id');
        });
    }
};
