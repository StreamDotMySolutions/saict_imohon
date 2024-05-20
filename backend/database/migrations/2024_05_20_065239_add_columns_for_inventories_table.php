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
        Schema::table('inventories', function (Blueprint $table) {
            $table->string('contract_number')->nullable(); // no kontrak
            $table->string('contract_name')->nullable(); // nama kontrak
            $table->string('contract_pic')->nullable(); // person in charge
            $table->string('contract_owner')->nullable(); // pemilik projek
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inventories', function (Blueprint $table) {
            $table->dropColumn('contract_number');
            $table->dropColumn('contract_name');
            $table->dropColumn('contract_pic');
            $table->dropColumn('contract_owner');
        });
    }
};
