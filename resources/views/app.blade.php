@extends('layout')

@section('title', env('APP_NAME'))

@section('content')
    <div id="app"></div>

    <div id="modal-root"></div>

    <script src="{{ mix('js/app.js') }}"></script>
@endsection
