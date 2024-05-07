<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('mohon_items', function (Blueprint $table) {
            $table->string('name')->nullable()->after('description');
            $table->string('occupation')->nullable();
            $table->string('department')->nullable();
            $table->string('section')->nullable();
            $table->string('unit')->nullable();
            $table->string('location')->nullable();
            $table->string('mobile')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mohon_items', function (Blueprint $table) {
            $table->dropColumn('name');
            $table->dropColumn('occupation');
            $table->dropColumn('department');
            $table->dropColumn('section');
            $table->dropColumn('unit');
            $table->dropColumn('location');
        });
    }
};
