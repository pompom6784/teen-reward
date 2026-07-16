<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('chores', function (Blueprint $table) {
            $table->string('emoji', 16)->default('🧹');
        });

        Schema::table('rewards', function (Blueprint $table) {
            $table->string('emoji', 16)->default('🎁');
        });
    }

    public function down(): void
    {
        Schema::table('chores', function (Blueprint $table) {
            $table->dropColumn('emoji');
        });

        Schema::table('rewards', function (Blueprint $table) {
            $table->dropColumn('emoji');
        });
    }
};
