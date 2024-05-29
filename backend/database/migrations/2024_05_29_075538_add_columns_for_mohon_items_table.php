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
   
        Schema::table('mohon_items', function (Blueprint $table) {
            $table->integer('department_id')->nullable()->after('id');
            $table->string('building_level')->nullable()->after('description');
            $table->string('building_name')->nullable();
            
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mohon_items' , function (Blueprint $table){
            $table->dropColumn('department_id');
            $table->dropColumn('building_level');
            $table->dropColumn('building_name');
        });
    }
};
