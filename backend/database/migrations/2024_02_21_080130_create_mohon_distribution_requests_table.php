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
        Schema::create('mohon_distribution_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->costrained();
            $table->foreignId('mohon_request_id')->costrained();
            $table->integer('step')->default(0);
            $table->text('message')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mohon_distributions');
    }
};
