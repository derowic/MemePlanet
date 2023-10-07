<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        <script>
console.log(`


__        _______ _     ____ ___  __  __ _____
\\ \\      / | ____| |   / ___/ _ \\|  \\/  | ____|
 \\ \\ /\\ / /|  _| | |  | |  | | | | |\\/| |  _|
  \\ V  V / | |___| |__| |__| |_| | |  | | |___
   \\_/\\_/  |_____|_____\\____\\___/|_|  |_|_____|


  ___  _   _
 / _ \\| \\ | |
| | | |  \\| |
| |_| | |\\  |
 \\___/|_| \\_|


 __  __ _____ __  __ _____
|  \\/  | ____|  \\/  | ____|
| |\\/| |  _| | |\\/| |  _|
| |  | | |___| |  | | |___
|_|  |_|_____|_|  |_|_____|


 ____  _        _    _   _ _____ _____
|  _ \\| |      / \\  | \\ | | ____|_   _|
| |_) | |     / _ \\ |  \\| |  _|   | |
|  __/| |___ / ___ \\| |\\  | |___  | |
|_|   |_____/_/   \\_|_| \\_|_____| |_|

We're happy you're here
`);

        </script>
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
