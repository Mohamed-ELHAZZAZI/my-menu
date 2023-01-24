<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @if (Auth::check()) 
        <meta name="user_id" content="{{ Auth::user()->id }}" />
        @endif 
        <title>Laravel 9 with vue 3 vite</title>
        @vite('resources/css/app.css')
    </head>
    <body class="">
        <div id="app"></div>
        @vite('resources/js/app.js')
    </body>
</html>