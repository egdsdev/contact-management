<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ContactFactory extends Factory
{
    protected $model = \App\Models\Contact::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'contact' => $this->faker->unique()->numerify('#########'), // 9 digits
            'email' => $this->faker->unique()->safeEmail(),
        ];
    }
}
