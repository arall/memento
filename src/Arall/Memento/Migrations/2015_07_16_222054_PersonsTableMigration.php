<?php

use Arall\Memento\Contracts\Migration;
use Lazer\Classes\Database as Lazer;

class PersonsTableMigration implements Migration
{
    public function run()
    {
        Lazer::create('persons', array(
            'id'        => 'integer',
            'alias'     => 'string',
            'full_name' => 'string',
        ));
    }
}
