<?php

namespace App\Http\Controllers;

class WelcomeController extends Controller
{
    public function sample()
    {
        $data = ['sample', 'api', 'call', 'with', 'laravel', 'and', 'restangular'];

        return response()->json(['data' => $data]);
    }
}
