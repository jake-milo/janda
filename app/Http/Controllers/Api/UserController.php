<?php

namespace App\Http\Controllers\Api;

use App\Models\Practice;
use App\Http\Controllers\Controller;
use App\Http\Resources\Practice as PracticeResource;
use App\Http\Resources\User as UserResource;
use App\Http\Requests\CreatePracticeRequest;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdatePracticeRequest;
use App\Http\Requests\GetPracticeRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();

        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\CreateUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateUserRequest $request)
    {
        $user = $request->getUserData();
        $user = User::create($user);

        return UserResource::make($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return UserResource::make($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\UpdateUserRequest  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $updates = $request->getUpdates();

        $user->fill($updates);
        $user->save();

        return UserResource::make($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            'Deleted user',
        ]);
    }

    public function restore(int $user)
    {
        $user = User::onlyTrashed()->find($user);
        $user->restore();

        return response()->json([
            'Restored user'
        ]);
    }
}
