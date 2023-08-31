<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

class ExampleController extends Controller
{
    public function getData()
    {
        $data = [
            ['id' => 1, 'name' => 'Item 1'],
            ['id' => 2, 'name' => 'Item 2'],
            // Dodaj inne przykładowe dane
        ];

        return response()->json($data);
    }
}
