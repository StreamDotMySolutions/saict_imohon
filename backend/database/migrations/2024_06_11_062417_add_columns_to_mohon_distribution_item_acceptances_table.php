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
           $table->integer('user_id')->nullable()->after('id');
           $table->text('message')->nullable()->after('mohon_distribution_item_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mohon_distribution_item_acceptances', function (Blueprint $table) {
            $table->dropColumn('user_id');
            $table->dropColumn('message');
        });
    }
};
