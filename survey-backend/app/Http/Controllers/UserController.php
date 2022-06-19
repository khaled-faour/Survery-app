<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User;

class UserController extends Controller
{
    //

    public function get(){
        $surveys = Auth::User()->surveys()->with('questions.options')->get();

        return response()->json([
            'surveys'=>$surveys
        ]);
    }
}
