<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder {
    /**
     * Run the user seeds.
     */
    public function run(): void {
        User::factory()->count(35)->hasProfile()->create();
    }
}
