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
            $table->foreignId('user_id')->costrained(); // user yang terima
            $table->string('vendor')->nullable(); // vendor yg bekalkan
            $table->string('email')->nullable(); // email vendor
            $table->string('phone')->nullable(); // phone vendor
            $table->string('model')->nullable(); // model
            $table->string('item')->nullable(); // peralatan
            $table->integer('total')->nullable(); // jumlah
            $table->date('date_start')->nullable(); // tender mula
            $table->date('date_end')->nullable(); // tender tamat
            $table->date('received_on')->nullable(); // bila barang masuk stor
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
