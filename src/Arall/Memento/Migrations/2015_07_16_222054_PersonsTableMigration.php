<?php

use Arall\Memento\Contracts\Migration;
use Lazer\Classes\Database as Lazer;

class PersonsTableMigration implements Migration
{
    public function up()
    {
        Lazer::create('persons', array(
            'id'   => 'integer',
            'name' => 'string',
        ));
    }

    public function down()
    {
        Lazer::remove('persons');
    }
}
