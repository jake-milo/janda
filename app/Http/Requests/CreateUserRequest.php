<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'string|required',
            'email' => 'email|required|unique:users,email',
        ];
    }

    public function getUserData(): array
    {
        $data = $this->only('name', 'email');

        $data['activation_token'] = $this->generateToken();

        return $data;
    }

    protected function generateToken(): string
    {
        return md5(rand(1, 10) . microtime());
    }
}
