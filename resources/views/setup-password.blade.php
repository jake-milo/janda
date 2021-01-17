@extends('layout')

@section('title')
Setup Account - {{ env('APP_NAME') }}
@endsection

@push('styles')
<link rel="stylesheet" href="/css/login.css" />
@endpush

@section('content')
<img src="/img/logo.png" alt="Jeffery & Associates" class="logo">

<form action="{{ route('setup-password', ['token' => $token, 'signature' => $signature]) }}" method="POST">
    @csrf

    <p>Please set yourself a password below.</p>

    <div class="input-wrapper">
        <label for="password">Password</label>
        <input type="password" name="password" placeholder="Password" required />
    </div>

    <div class="input-wrapper">
        <label for="password_confirmation">Confirm Password</label>
        <input type="password" name="password_confirmation" placeholder="Confirm Password" required />
    </div>

    <input type="submit" value="Finish Setup" />

    @if ($errors->any())
    @foreach ($errors->all() as $error)
    <p>{{ $error }}</p>
    @endforeach
    @endif
</form>
@endsection