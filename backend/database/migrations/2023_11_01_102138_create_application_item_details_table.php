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
        Schema::create('application_item_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('application_item_id')->costrained();
            $table->enum('item', ['pc','nb','pbwn','pcn'])->nullable;
            $table->integer('number')->default(0);
            $table->text('description')->nullable;
            $table->enum('type', ['new','replace'])->default('new');
            $table->enum('status', ['requested','received'])->default('requested');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('application_item_details');
    }
};
