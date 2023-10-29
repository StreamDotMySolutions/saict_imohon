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
            $table->text('pc_description')->nullable();
            $table->enum('pc_type', ['new', 'replace']);

            $table->integer('nb')->default(0);
            $table->text('nb_description')->nullable();
            $table->enum('nb_type', ['new', 'replace']);

            $table->integer('pbwn')->default(0);
            $table->text('pbwn_description')->nullable();
            $table->enum('pbwn_type', ['new', 'replace']);

            $table->integer('pcn')->default(0);
            $table->text('pcn_description')->nullable();
            $table->enum('pcn_type', ['new', 'replace']);

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
