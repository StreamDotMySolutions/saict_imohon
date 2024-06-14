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
            $table->integer('approver_id')->nullable()->after('user_id');
            $table->integer('requester_id')->nullable()->after('approver_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mohon_approvals', function (Blueprint $table) {
            $table->dropColumn('approver_id');
            $table->dropColumn('requester_id');
        });
    }
};
