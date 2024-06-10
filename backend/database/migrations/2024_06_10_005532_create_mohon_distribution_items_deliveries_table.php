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
        Schema::create('mohon_distribution_item_deliveries', function (Blueprint $table) {
            $table->id();
            $table->integer('mohon_distribution_item_id');
            $table->string('pic_name')->nullable();
            $table->string('pic_phone')->nullable();  
            $table->date('date_start')->nullable(); 
            $table->date('date_end')->nullable(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mohon_distribution_item_deliveries');
    }
};
