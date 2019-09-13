<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $userId = $this->user->id;

        return [
            'name' => 'nullable|string',
            'email' => "nullable|email|unique:users,email,$userId",
            'password' => 'nullable|string',
        ];
    }

    public function getUpdates()
    {
        $data = $this->only('name', 'email', 'password');

        if ($password = $data['password']) {
            $data['password'] = bcrypt($password);
        }

        return $data;
    }
}
