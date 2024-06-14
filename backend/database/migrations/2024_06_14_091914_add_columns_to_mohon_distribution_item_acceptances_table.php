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
            $table->string('pic_name')->nullable()->after('message');
            $table->string('pic_phone')->nullable()->after('pic_name');  
            $table->date('installation_date')->nullable()->after('pic_phone'); 
     
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mohon_distribution_item_acceptances', function (Blueprint $table) {
            $table->dropColumn('pic_name');
            $table->dropColumn('pic_phone');
            $table->dropColumn('installation_date');
        });
    }
};
