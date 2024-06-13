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
            $table->string('status')->nullable()->after('description');
            $table->string('step')->nullable()->after('status');
            $table->integer('approver_id')->nullable()->after('step');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mohon_requests', function (Blueprint $table) {
            $table->dropColumn('status');
            $table->dropColumn('step');
            $table->dropColumn('approver_id');
        });
    }
};
