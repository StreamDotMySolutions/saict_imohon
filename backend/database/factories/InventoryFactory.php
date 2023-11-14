<?php

namespace Database\Factories;

use App\Models\Inventory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inventory>
 */
class InventoryFactory extends Factory
{

    protected $model = Inventory::class;

    public function definition(): array
    {
      return [
        'vendor' => $this->faker->company,
        'item' => $this->faker->randomElement(['pc', 'pcn', 'pbwn','nb']),
        'model' => $this->faker->randomElement(['HP', 'ACER', 'MSI','MAC','IBM','SURFACE']),
        'user_id' => $this->faker->numberBetween(1, 5),
        'total' => $this->faker->numberBetween(1, 100),
        'email' => $this->faker->email,
        'phone' => $this->faker->phoneNumber,
        'date_start' => $this->faker->dateTimeBetween('2023-01-01', '2025-12-31')->format('Y-m-d'),
        'date_end' => $this->faker->dateTimeBetween('2023-01-01', '2025-12-31')->format('Y-m-d'),
        'received_on' =>  $this->faker->dateTimeBetween('2023-01-01', '2023-12-31')->format('Y-m-d'),
        ];
    }
}
