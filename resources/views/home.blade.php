<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

<!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round|Open+Sans">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet"  >

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css" />



    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>

    <script src="{{ asset('js/jquery.min.js') }} " defer></script>
</head>
<body>
<div id="app">
    <main class="py-4">
        <div class="container">
            <div class="row justify-content-center">
                @if (session('status'))
                    <div class="alert alert-success" roile="alert">
                        {{ session('status') }}
                    </div>
                @endif

                <div class="col-md-8">
                    <div class="panel panel-default">
                        <div class="panel-heading mb-3">Feedback</div>
                        <div class="panel-body">
                            <p class="text-danger error-test"></p>
                            <p class="alert-success success-test"></p>

                            <input id="name" type="text" class="form-control mb-4" name="name" placeholder="Name *">
                            <input id="phone" type="text" class="form-control mb-4" name="phone" placeholder="Phone Number *">
                            <input id="email" type="email" class="form-control mb-4" name="email" placeholder="Email">

                            <button class="btn btn-lg btn-block btn-primary mt-4 feedback-btn" type="submit"> Send </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </main>
</div>
</body>
</html>


@include('layouts.javascripts')

