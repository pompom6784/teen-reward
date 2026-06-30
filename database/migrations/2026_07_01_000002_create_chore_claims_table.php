<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('chore_claims', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chore_id')->constrained('chores')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->date('period_start')->nullable();
            $table->string('status')->default('pending');
            $table->text('evidence')->nullable();
            $table->integer('points_awarded')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chore_claims');
    }
};
