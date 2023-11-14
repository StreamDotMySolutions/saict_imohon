<?php

namespace Database\Factories;
use App\Models\Distribution;


use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Distribution>
 */
class DistributionFactory extends Factory
{

    protected $model = Distribution::class;

    public function definition(): array
    {
      return [
        'item' => $this->faker->randomElement(['pc', 'pcn', 'pbwn','nb','webcam','projector']),

        'user_id' => $this->faker->numberBetween(1, 5),
        'application_id' => $this->faker->numberBetween(1, 100),
        'total' => $this->faker->numberBetween(1, 100),
        'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
        'description' => $this->faker->sentence, 
        ];
    }
}
