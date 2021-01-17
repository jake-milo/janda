<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SetPasswordRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'password' => 'string|required|confirmed',
        ];
    }

    public function messages()
    {
        return [
            'password.confirmed' => 'Password confirmation didn\'t match!',
        ];
    }

    public function getPassword()
    {
        $password = $this->input('password');

        return bcrypt($password);
    }
}
