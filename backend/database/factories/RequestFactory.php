<?php

namespace Database\Factories;

use App\Models\Request;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Request>
 */
class RequestFactory extends Factory
{
    protected $model = Request::class;

    public function definition(): array
    {
      return [
        'user_id' => $this->faker->numberBetween(1, 5),
        'item' => $this->faker->randomElement(['pc', 'pcn', 'pbwn','nb','webcam','projector']),
        'total' => $this->faker->numberBetween(1, 100),
        'description' => $this->faker->sentence, 
        ];
    }
}
