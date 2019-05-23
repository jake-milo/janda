@extends('layout')

@section('title')
Login - {{ env('APP_NAME') }}
@endsection

@push('styles')
    <link rel="stylesheet" href="/css/login.css" />
@endpush

@section('content')
    <img src="/img/logo.png" alt="Jeffery & Associates" class="logo">

    <form action="{{ route('login') }}" method="POST">
        @csrf

        <div class="input-wrapper">
            <label for="email">Email</label>
            <input type="email" name="email" placeholder="Email" required value="{{ old('email') }}" />
        </div>

        <div class="input-wrapper">
            <label for="password">Password</label>
            <input type="password" name="password" placeholder="Password" required />
        </div>

        <div class="checkbox-wrapper">
            <input type="checkbox" name="remember_me" id="remember_me" value="1" />
            <label for="remember_me">
                    Remember Me
            </label>
        </div>

        <input type="submit" value="Log In" />

        @if ($errors->any())
            @foreach ($errors->all() as $error)
                <p>{{ $error }}</p>
            @endforeach
        @endif
    </form>
@endsection
