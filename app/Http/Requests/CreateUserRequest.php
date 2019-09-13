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
            'password' => 'string|required',
        ];
    }

    public function getUserData(): array
    {
        $data = $this->only('name', 'email', 'password');
        $data['password'] = bcrypt($data['password']);

        return $data;
    }
}
