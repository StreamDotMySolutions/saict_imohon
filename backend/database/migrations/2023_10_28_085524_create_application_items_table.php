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

            $table->integer('pc_requested')->default(0);
            $table->integer('pc_approved')->default(0);
            $table->integer('pc_received')->default(0);
            
            $table->integer('nb_requested')->default(0);
            $table->integer('nb_approved')->default(0);
            $table->integer('nb_received')->default(0);

            $table->integer('pbwn_requested')->default(0);
            $table->integer('pbwn_approved')->default(0);
            $table->integer('pbwn_received')->default(0);

            $table->integer('pcn_requested')->default(0);
            $table->integer('pcn_approved')->default(0);
            $table->integer('pcn_received')->default(0);

            $table->integer('webcam_requested')->default(0);
            $table->integer('webcam_approved')->default(0);
            $table->integer('webcam_received')->default(0);

            $table->integer('projektor_requested')->default(0);
            $table->integer('projektor_approved')->default(0);
            $table->integer('projektor_received')->default(0);

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
