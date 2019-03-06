<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Login - {{ env('APP_NAME') }}</title>
    </head>
    <body>
        <form action="{{ route('login') }}" method="POST">
            @csrf

            <input type="email" name="email" placeholder="Email" required value="{{ old('email') }}" />
            <br />
            <input type="password" name="password" placeholder="Password" required />
            <br />
            <label for="remember_me">
                <input type="checkbox" name="remember_me" value="1" />
                Remember Me
            </label>
            <br />
            <input type="submit" value="Log In" />

            @if ($errors->any())
                @foreach ($errors->all() as $error)
                    <p>{{ $error }}</p>
                @endforeach
            @endif
        </form>
    </body>
</html>
