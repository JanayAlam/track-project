<?php

namespace Database\Factories;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Profile>
 */
class ProfileFactory extends Factory {
    /**
     * Define the model's default state.
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'gender' => $this->faker->randomElement(['M', 'F', 'O']),
            'user_id' => User::factory(),
        ];
    }
}
