<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $user = new User;
        $user->name = "Khaled Faour";
        $user->email = "khaledfaour2@gmail.com";
        $user->password = Hash::make("khaled123");
        $user->user_type = 1;
        $user->save();
    }
}
