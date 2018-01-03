<?php

use Illuminate\Database\Seeder;

class Zapvalidationseeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('zap_validation_type')->insert([[
            'validation_type' =>'Exists',
        ],[
            'validation_type' =>'=',
        ],[
            'validation_type' =>'!=',
        ]]);
    }
}
