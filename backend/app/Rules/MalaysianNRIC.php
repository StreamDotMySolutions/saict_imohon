<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class MalaysianNRIC implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        
    }

    public function passes($attribute, $value)
    {
        return preg_match('/^\d{6}-[LMTSC]{1}-\d{3}[A-Z]$/', $value);
    }

    public function message()
    {
        return 'The :attribute is not a valid Malaysian NRIC.';
    }


}
