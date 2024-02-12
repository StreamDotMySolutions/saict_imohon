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
        Schema::create('mohon_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mohon_request_id')->costrained();
            $table->foreignId('category_id')->costrained();
            $table->integer('type')->nullable(); // baharu or ganti
            $table->text('description')->nullable(); // description
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mohon_items');
    }
};
