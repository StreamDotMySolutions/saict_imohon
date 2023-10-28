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
        Schema::create('application_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('application_id')->costrained();
            $table->integer('pc')->default(0);
            $table->integer('nb')->default(0);
            $table->integer('pbwn')->default(0);
            $table->integer('pcn')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('application_items');
    }
};
