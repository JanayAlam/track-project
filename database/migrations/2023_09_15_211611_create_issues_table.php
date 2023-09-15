<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('issues', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable(false);
            $table->string('details')->nullable();
            $table->string('branch_name')->nullable(false);
            $table->string('label')->nullable(false)->default('feature');
            $table->string('status')->nullable(false)->default('todo');
            $table->string('is_closed')->default(false);
            $table->dateTime('deadline')->nullable();
            $table->integer('project_id')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('issues');
    }
};
