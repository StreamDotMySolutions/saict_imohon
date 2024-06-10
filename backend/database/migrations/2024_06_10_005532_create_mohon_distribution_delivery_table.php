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
        Schema::create('mohon_distribution_delivery', function (Blueprint $table) {
            $table->id();
            $table->integer('mohon_distribution_request_id');
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
        Schema::dropIfExists('mohon_distribution_delivery');
    }
};
