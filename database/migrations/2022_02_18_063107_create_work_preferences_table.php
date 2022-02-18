<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('work_preferences', function (Blueprint $table) {
            $table->id();
            $table->string('weekly_availability')->nullable();
            $table->string('no_availability_reason')->nullable();
            $table->dateTime('available_from')->nullable();
            $table->string('search_status')->nullable();
            $table->enum('work_type', ['remote', 'onsite', 'mixed'])->nullable();
            $table->enum('client_type', ['small', 'medium', 'enterprise'])->nullable();
            $table->string('commitment_length')->nullable();
            $table->string('prefered_timezone')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('work_preferences');
    }
};
