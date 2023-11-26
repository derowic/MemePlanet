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


        </script>
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead

        <style>
            html, body {
                scrollbar-width: thin;
                scrollbar-color: purple #555;
                background-color: #111;
            }

            ::-webkit-scrollbar {
                width: 3px;
            }

            ::-webkit-scrollbar-track {
                width: 4px;
            }

            ::-webkit-scrollbar-thumb {
                background-color: #8f43ec;
            }

            ::-webkit-scrollbar-thumb:hover {
                background-color: #af65fe;
            }
            ::-webkit-scrollbar-track {
                background-color: rgba(0, 0, 0, 0);
            }

            ::-webkit-scrollbar-track:hover {
                /*background-color: #fff;*/
            }
        </style>
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
