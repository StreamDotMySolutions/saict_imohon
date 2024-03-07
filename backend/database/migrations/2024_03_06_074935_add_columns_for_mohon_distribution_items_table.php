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
            $table->boolean('received_status')->default(false);
            $table->text('received_text')->nullable();
            $table->timestamp('received_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mohon_distribution_items', function (Blueprint $table) {
            $table->dropColumn('received_status');
            $table->dropColumn('received_text');
            $table->dropColumn('received_at');
        });
    }
};
