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
        Schema::create('distributions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->costrained();
            $table->foreignId('application_id')->costrained()->nullable();
            $table->string('item')->nullable();
            $table->string('brand')->nullable();
            $table->integer('total')->nullable();
            $table->text('description')->nullable();
            
            // pending - when created
            // approved - by pelulus2
            // rejected - by pelulus2
            // received - by applicant
            $table->enum('status', ['pending', 'approved', 'rejected','received']);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('distributions');
    }
};
