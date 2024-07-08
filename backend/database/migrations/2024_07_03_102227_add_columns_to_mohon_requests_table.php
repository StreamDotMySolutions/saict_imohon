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
        Schema::table('mohon_requests', function (Blueprint $table) {
            $table->enum('ticket_status', ['open', 'close'])->default('open')->after('step');
            $table->dateTime('ticket_close_date')->nullable()->after('ticket_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mohon_requests', function (Blueprint $table) {
            $table->dropColumn('ticket_close_date');
            $table->dropColumn('ticket_status');
        });
    }
};
