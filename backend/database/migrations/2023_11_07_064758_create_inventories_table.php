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
        Schema::create('inventories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->costrained();
            $table->string('vendor')->nullable();
            $table->string('item')->nullable();
            $table->integer('total')->nullable();
            $table->date('date_start')->nullable();
            $table->string('date_end')->nullable();
            $table->string('received_by')->nullable();
            $table->date('received_on')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventories');
    }
};
