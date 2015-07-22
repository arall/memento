<?php

use Illuminate\Database\Seeder;
use App\Models\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = array(
                ['name' => 'Gerard Arall', 'username' => 'arall', 'email' => 'gerard.arall@gmail.com', 'password' => Hash::make('123123')],
                ['name' => 'Victor Montalà', 'username' => 'vmontala', 'email' => 'vmontala@gmail.com', 'password' => Hash::make('123123')],
        );
            
        // Loop through each user above and create the record for them in the database
        foreach ($users as $user) {
            User::create($user);
        }
    }
}
